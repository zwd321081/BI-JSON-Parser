import { TokenType } from "./TokenType";
import * as AstNode from "./Ast";
import { objectExpression } from "@babel/types";

export default class Parser {
  constructor(lexer) {
    this.lexer = lexer;
    this.currentToken = lexer.getNextToken();
    this.isParseValidate = true; //flag to make sure pass the parser test
  }
  /**
     json
    : value
    ; */
  paseJSON() {
    return this.parseValue();
  }

  /**obj 
    : "{" pair (,pair)* "}"
    ; */
  parseObject() {
    let _obj = new AstNode.JsonObject();
    this.eat(TokenType.OpenBrace);
    let _pairs = [];
    _pairs.push(this.parsePair());
    while (this.currentToken.type == TokenType.COMMA) {
      this.eat(TokenType.COMMA);
      _pairs.push(this.parsePair());
    }
    this.eat(TokenType.CloseBrace);
    _obj.pairs = _pairs;
    return _obj;
  }

  /** String: value */
  parsePair() {
    let _pair = new AstNode.JsonPair();
    const _key = this.currentToken.value;
    let _pkey = new AstNode.JsonKey(_key);
    _pair.key = _pkey;
    this.eat(TokenType.StringLiteral);
    this.eat(TokenType.COLON);
    let _value = this.parseValue();
    _pair.value = _value;
    return _pair;
  }

  //STRING(|STRING)*
  parseString() {
    let arr = [];
    arr.push(new AstNode.JsonString(this.currentToken.value));
    this.eat(TokenType.StringLiteral);
    while (this.currentToken.type == TokenType.BitOr) {
      this.eat(TokenType.BitOr);
      arr.push(new AstNode.JsonString(this.currentToken.value));
      this.eat(TokenType.StringLiteral);
    }
    return arr;
  }

  parseNumber() {
    const _value = this.currentToken.value;
    this.eat(TokenType.NUMBER);
    return new AstNode.JsonNumber(_value);
  }

  peek(index) {
    return this.lexer.peek(index);
  }

  /**match the current token and get the next */
  eat(tokenType) {
    if (this.currentToken.type == tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      //   console.error(
      //     `this.currentToken is ${JSON.stringify(
      //       this.currentToken
      //     )} doesn't match the input ${tokenType}`
      //   );
      this.isParseValidate = false;
      throw new Error(
        `this.currentToken is ${JSON.stringify(
          this.currentToken
        )} doesn't match the input ${tokenType}`
      );
    }
  }

  /**
     * value
    : STRING(|STRING)*
    | NUMBER
    | obj
    | 'true'
    | 'false'
    ; */
  parseValue() {
    let _valueObj = new AstNode.JsonValue();
    const _current = this.currentToken;
    switch (this.currentToken.type) {
      case TokenType.OpenBrace:
        _valueObj.children.push(this.parseObject());
        break;
      case TokenType.StringLiteral:
        _valueObj.children = _valueObj.children.concat(this.parseString());
        break;
      case TokenType.NUMBER:
        _valueObj.children.push(this.parseNumber());
        break;
      case TokenType.TRUE:
        this.eat(TokenType.TRUE);
        _valueObj.children.push(new AstNode.JsonBoolean(_current.value));
        break;
      case TokenType.FALSE:
        this.eat(TokenType.FALSE);
        _valueObj.children.push(new AstNode.JsonBoolean(_current.value));
        break;
    }

    return _valueObj;
  }
}

import { TokenType } from "./TokenType";
import * as AstNode from "./Ast";
import { objectExpression } from "@babel/types";

export default class Parser {
  constructor(lexer) {
    this.lexer = lexer;
    this.sym = {}; //暂时记录comment的一些信息，类似global symbol.
    this.currentToken = lexer.getNextToken();
    this.isParseValidate = true; //flag to make sure pass the parser test
  }
  /**
     json
    : value
    ; */
  paseJSON() {
    debugger;
    let doc = new AstNode.JsonDocument();
    doc.child = this.parseValue();
    return doc;
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
      _pairs(this.parsePair());
    }
    this.eat(TokenType.CloseBrace);
    _obj.pairs = _pairs;
    return _obj;
  }

  /** String: value(,comment)? */
  parsePair() {
    let _pair = new AstNode.JsonPair();
    const _key = this.currentToken.value;
    let _pkey = new AstNode.JsonKey(_key);
    _pair.key = _pkey;
    this.eat(TokenType.StringLiteral);
    this.eat(TokenType.COLON);
    let _value = this.parseValue();
    if (this.currentToken.type == TokenType.SingleLineComment) {
      this.sym[_key] = this.currentToken.value;
      this.eat(TokenType.SingleLineComment);
    }
    _pair.value = _value;
    return _pair;
  }

  //STRING(|STRING)*
  parseString() {
    this.eat(TokenType.StringLiteral);
    while (this.currentToken.type == TokenType.BitOr) {
      this.eat(TokenType.BitOr);
      this.eat(TokenType.StringLiteral);
    }
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
    switch (this.currentToken.type) {
      case TokenType.OpenBrace:
        return this.parseObject();
        break;
      case TokenType.StringLiteral:
        return this.parseString();
        break;
      case TokenType.NUMBER:
        const _current = this.currentToken;
        this.eat(TokenType.NUMBER);
        return new AstNode.JsonNumber(_current.value);
        break;
    }
  }

  getComment(key) {
    return this.sym[`"${key}"`];
  }
}

import { TokenType } from "./TokenType";

export default class Parser {
  constructor(lexer) {
    this.lexer = lexer;
    this.currentToken = lexer.getNextToken();
    this.isClear = true; //flag to make sure pass the parser test
  }
  /**
     json
    : value
    ; */
  paseJSON() {
    this.parseValue();
  }

  /**obj 
    : "{" pair (,pair)* "}"
    ; */
  parseObject() {
    this.eat(TokenType.OpenBrace);
    this.parsePair();
    while (this.currentToken.type == TokenType.COMMA) {
      this.parsePair();
    }
    this.eat(TokenType.CloseBrace);
  }

  /** String: value(,comment)? */
  parsePair() {
    this.eat(TokenType.StringLiteral);
    this.eat(TokenType.COLON);
    this.parseValue();
    if (this.currentToken == TokenType.COMMA) {
      this.eat(TokenType.SingleLineComment);
    }
  }

  //STRING(|STRING)*
  parseString() {
    this.eat(TokenType.StringLiteral);
    while (this.currentToken.type == TokenType.BitOr) {
      this.eat(TokenType.StringLiteral);
    }
  }

  /**match the current token and get the next */
  eat(tokenType) {
    if (this.currentToken.type == tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      console.error(
        `this.currentToken is ${JSON.stringify(
          this.currentToken
        )} doesn't match the input ${tokenType}`
      );
      this.isClear = false;
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
        this.parseObject();
        break;
      case TokenType.StringLiteral:
        this.parseString();
        break;
      case TokenType.NUMBER:
        this.eat(TokenType.NUMBER);
        break;
    }
  }
}

import { TokenType, KeyWords } from "./TokenType";
import Token from "./Token";

class Lexer {
  constructor(input) {
    this.input = input;
    this.pos = 0;
    this.currentChar = this.input[this.pos];
    this.tokens = [];
    this.tokenIndex = 0; //为了取得下一个token用
    this.lex();
  }
  /**获取下一个字符 */
  consume() {
    if (!this.isEnd()) {
      this.pos++;
      this.currentChar = this.input[this.pos];
    } else {
      this.currentChar = TokenType.EOFILE;
    }
  }
  isEnd() {
    return this.pos > this.input.length - 1;
  }

  /**匹配输入的字符，如果相等则获取下一个 */
  match(inputchar) {
    if (this.currentChar == inputchar) {
      this.consume();
    } else {
      console.error(`${inputchar} is not matched`);
    }
  }

  getCurrentChar() {
    return this.currentChar;
  }
  isSpace(char) {
    const re = /\s/gi;
    return re.test(char);
  }
  skipWhiteSpace() {
    const re = /\s/gi;
    while (!this.isEnd() && this.isSpace(this.currentChar)) {
      this.consume();
    }
  }

  isLetter(char) {
    const re = /\w/g;
    return re.test(char);
  }

  isNewLine(char) {
    const re = /\r?\n/;
    return re.test(char);
  }

  getStringToken() {
    let buffer = "";
    this.match(TokenType.QUOTE);
    while (
      this.isLetter(this.currentChar) ||
      this.currentChar == TokenType.BitOr
    ) {
      buffer += this.currentChar;
      this.consume();
    }
    if (buffer) {
      let bitStrings = buffer.split(TokenType.BitOr);
      let bitNumber = bitStrings.length - 1;
      bitStrings.forEach((item, index) => {
        let finalStr = '"' + item + '"';
        this.tokens.push(new Token(TokenType.StringLiteral, finalStr));
        if (index < bitNumber) {
          this.tokens.push(new Token(TokenType.BitOr, TokenType.BitOr));
        }
      });
      this.match(TokenType.QUOTE);
    }
  }

  isNumber(char) {
    const re = /\d/g;
    return re.test(char);
  }

  getNumberToken() {
    let buffer = "";
    while (this.isNumber(this.currentChar)) {
      buffer += this.currentChar;
      this.consume();
    }
    if (buffer) {
      return new Token(TokenType.NUMBER, buffer);
    }
  }
  getKeyWordToken() {
    let buffer = "";
    while (this.isLetter(this.currentChar)) {
      buffer += this.currentChar;
      this.consume();
    }
    let isKeyWord = KeyWords[buffer];
    if (isKeyWord) {
      return new Token(isKeyWord, isKeyWord);
    } else {
      console.error(`${buffer} is not an valid token`);
    }
  }

  getCommentToken() {
    //简单处理两个/
    this.match(TokenType.SingleSlash);
    this.match(TokenType.SingleSlash);

    let buffer = "";

    while (!this.isNewLine(this.currentChar) && !this.isEnd()) {
      buffer += this.currentChar;
      this.consume();
    }

    if (buffer) {
      buffer = buffer.trim();
      return new Token(TokenType.SingleLineComment, buffer);
    }
  }

  //获取所有的token;
  lex() {
    while (this.currentChar && this.currentChar != TokenType.EOFILE) {
      this.skipWhiteSpace();
      let token = "";
      switch (this.currentChar) {
        case "{":
          this.consume();
          token = new Token(TokenType.OpenBrace, TokenType.OpenBrace);
          break;
        case "}":
          this.consume();
          token = new Token(TokenType.CloseBrace, TokenType.CloseBrace);
          break;
        case '"':
          token = this.getStringToken();
          break;
        case ":":
          this.consume();
          token = new Token(TokenType.COLON, TokenType.COLON);
          break;
        case ",":
          this.consume();
          token = new Token(TokenType.COMMA, TokenType.COMMA);
          break;
        case "/":
          token = this.getCommentToken();
          break;
        default:
          if (this.isNumber(this.currentChar)) {
            token = this.getNumberToken();
          } else if (this.isLetter(this.currentChar)) {
            token = this.getKeyWordToken();
          } else {
            console.error(`${this.currentChar} is not a valid type`);
          }
      }
      if (token) this.tokens.push(token);
    }

    this.tokens.push(new Token(TokenType.EOF, TokenType.EOF));
  }

  getNextToken() {
    if (this.tokenIndex <= this.tokens.length - 1) {
      return this.tokens[this.tokenIndex++];
    } else {
      console.error(
        `current index is ${this.tokenIndex} and the input length is ${this.tokens.length}`
      );
    }
  }
}

export default Lexer;

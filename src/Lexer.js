import TokenType from "./TokenType";
import Token from "./Token"

class Lexer{
    constructor(input){
        this.input = input;
        this.pos =0;
        this.currentChar = this.input[this.pos];
    }
    /**获取下一个字符 */
    consume(){
        if(!this.isEnd()){
            this.pos++;
            this.currentChar = this.input[this.pos];
        }else{
            this.currentChar = TokenType.EOF;
        }
    }
    isEnd(){
        return this.pos > this.input.length-1;
    }

    /**匹配输入的字符，如果相等则获取下一个 */
    match(inputchar){
        if(this.currentChar == inputchar){
            this.consume();
        }else{
            console.error(`${inputchar} is not matched`)
        }
    }

    getCurrentChar(){
        return this.currentChar;
    }
    isSpace(char){
        const re = /\s/gi;
        return re.test(char)
    }
    skipWhiteSpace(){
        const re = /\s/gi;
        while(!this.isEnd()&&this.isSpace(this.currentChar)){
            this.consume();
        }
    }

    isLetter(char){
        const re = /\w/g;
        return re.test(char)
    }

    getStringToken(){
        let buffer = '';
        this.match(TokenType.QUOTE);
        while(this.isLetter(this.currentChar)){
            buffer += this.currentChar;
            this.consume();
        }
        if(buffer){
            this.match(TokenType.QUOTE);
            return new Token(TokenType.StringLiteral,buffer)
        }
        

    }

    getNextToken(){

       
        if(this.currentChar != TokenType.EOFILE){
            this.skipWhiteSpace();
            switch(this.currentChar){
                case "{":
                    this.consume();
                    return new Token(TokenType.OpenBrace,"{");
                case '"':
                    return this.getStringToken();
                default:
                    console.error(`${this.currentChar} is not a valid type`)
                    
            }
        }
    }
}

export default Lexer;
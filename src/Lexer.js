import TokenType from "./TokenType";

class Lexer{
    constructor(input){
        this.input = input;
        this.pos =0;
        this.currentChar = this.input[this.pos];
    }
    /**获取下一个字符 */
    consume(){
        if(this.pos < this.input.length()-1){
            this.pos++;
            this.currentChar = this.input[this.pos];
        }else{
            this.currentChar = TokenType.EOF;
        }
    }

    /**匹配输入的字符，如果相等则获取下一个 */
    match(inputchar){
        if(this.currentChar == inputchar){
            thia.consume();
        }else{
            console.error(`${inputchar} is not matched`)
        }
    }

    getCurrentChar(){
        return this.currentChar;
    }

    getNextToken(){}
}

export default Lexer;
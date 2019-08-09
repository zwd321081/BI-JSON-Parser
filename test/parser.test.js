
import Lexer from "../src/Lexer";
import Parser from "../src/Parser";
test(" parser normal",()=>{
    const input = `{
        "resource": "song"
      }`
      debugger;
    let lexer = new Lexer(input);
    let parser = new Parser(lexer);
    parser.paseJSON();
})
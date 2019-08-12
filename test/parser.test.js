
import Lexer from "../src/Lexer";
import Parser from "../src/Parser";
import { equal } from "assert";
test(" parser normal",()=>{
    const input = `{
        "resource": "song"
      }`
    let lexer = new Lexer(input);
    let parser = new Parser(lexer);
    parser.paseJSON();
    expect(parser.isParseValidate).toBe(true);
})

test(" a comma at the end sentence ",()=>{
  const input = `{
      "resource": "song",
    }`
    
  let lexer = new Lexer(input);
  let parser = new Parser(lexer);
  try{
    parser.paseJSON();
  }catch(err){
    expect(parser.isParseValidate).toBe(false);
  }
  
})

test(" parser normal with comment",()=>{
  const input = `{
      "resource": "song" //isRequired
    }`
  let lexer = new Lexer(input);
  let parser = new Parser(lexer);
  parser.paseJSON();
  expect(parser.isParseValidate).toBe(true);
})

test(" parser normal with bitstring",()=>{
  const input = `{
      "resource": "song|album" //isRequired
    }`
  let lexer = new Lexer(input);
  let parser = new Parser(lexer);
  parser.paseJSON();
  expect(parser.isParseValidate).toBe(true);
})

test(" parser normal with bitstring and one more vertical line",()=>{
  const input = `{
      "resource": "song|album|" //isRequired
    }`

      
    let lexer = new Lexer(input);
    let parser = new Parser(lexer);
    try{
      parser.paseJSON();
    }catch(err){
      expect(parser.isParseValidate).toBe(false);
    }

})

test(" comment with isRequired",()=>{
  const input = `{
      "resource": "song|album" //isRequired
    }`

      debugger;
    let lexer = new Lexer(input);
    let parser = new Parser(lexer);
    parser.paseJSON();
    expect(parser.isParseValidate).toBe(true);
    let _comment = parser.getComment("resource")

    expect(_comment).toBe("isRequired")

})


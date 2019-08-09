
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
    expect(parser.isClear).toBe(true);
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
    expect(parser.isClear).toBe(false);
  }
  
})

test(" parser normal with comment",()=>{
  const input = `{
      "resource": "song" //isRequired
    }`
  let lexer = new Lexer(input);
  let parser = new Parser(lexer);
  parser.paseJSON();
  expect(parser.isClear).toBe(true);
})

test(" parser normal with bitstring",()=>{
  const input = `{
      "resource": "song|album" //isRequired
    }`
  let lexer = new Lexer(input);
  let parser = new Parser(lexer);
  parser.paseJSON();
  expect(parser.isClear).toBe(true);
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
      expect(parser.isClear).toBe(false);
    }

})
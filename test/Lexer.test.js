

import Lexer from "../src/Lexer"
import { TokenType } from "../src/TokenType";
test('get single string token',()=>{
    const input = `{
        "resource": "song"
      }`
    let lexer = new Lexer(input);
    let token = lexer.getNextToken();
    expect(token.type).toBe('{');
     token = lexer.getNextToken();
    expect(token.value).toBe("resource");
    expect(token.type).toBe('StringLiteral');
    token = lexer.getNextToken();
    expect(token.type).toBe(':');
    token = lexer.getNextToken();
    expect(token.value).toBe("song");
    expect(token.type).toBe('StringLiteral');
    token = lexer.getNextToken();
    expect(token.type).toBe('}');
    token = lexer.getNextToken();
    expect(token.type).toBe(TokenType.EOF);
})

test('value 为汉字',()=>{


  expect(()=>{
    const input = `{
      "resource": "活动url"
   }`
    new Lexer(input);
  }).toThrow();
})

test('get single number token',()=>{
  const input = `{
      "target": 111
    }`
  let lexer = new Lexer(input);
  let token = lexer.getNextToken();
  expect(token.type).toBe('{');
   token = lexer.getNextToken();
  expect(token.value).toBe("target");
  expect(token.type).toBe('StringLiteral');
  token = lexer.getNextToken();
  expect(token.type).toBe(':');
  token = lexer.getNextToken();
  expect(token.type).toBe('NUMBER');
  expect(token.value).toBe('111');
  token = lexer.getNextToken();
  expect(token.type).toBe('}');
  token = lexer.getNextToken();
  expect(token.type).toBe(TokenType.EOF);
})

test('get single boolean token',()=>{
  const input = `{
      "resourceid": false
    }`
  let lexer = new Lexer(input);
  let token = lexer.getNextToken();
  expect(token.type).toBe(`{`);
   token = lexer.getNextToken();
  expect(token.value).toBe("resourceid");
  expect(token.type).toBe('StringLiteral');
  token = lexer.getNextToken();
  expect(token.type).toBe(':');
  token = lexer.getNextToken();
  expect(token.type).toBe(TokenType.FALSE);
  expect(token.value).toBe('false');
  token = lexer.getNextToken();
  expect(token.type).toBe('}');
  token = lexer.getNextToken();
  expect(token.type).toBe(TokenType.EOF);
})

test('custom bit string token',()=>{
  const input = `{
      "page": "dailysongrecommend|userfm"
    }`
    
  let lexer = new Lexer(input);
  let token = lexer.getNextToken();
  expect(token.type).toBe(`{`);
   token = lexer.getNextToken();
  expect(token.value).toBe("page");
  expect(token.type).toBe('StringLiteral');
  token = lexer.getNextToken();
  expect(token.type).toBe(':');
  token = lexer.getNextToken();
  expect(token.value).toBe("dailysongrecommend");
  expect(token.type).toBe('StringLiteral');
  token = lexer.getNextToken();
  expect(token.type).toBe('|');
  token = lexer.getNextToken();
  expect(token.value).toBe("userfm");
  expect(token.type).toBe('StringLiteral');
  token = lexer.getNextToken();
  expect(token.type).toBe('}');
  token = lexer.getNextToken();
  expect(token.type).toBe(TokenType.EOF);
})

test('get single string token with comment',()=>{
  const input = `{
      "resource": "song", // 日推|私人FM,歌曲id，如123
    }`
  let lexer = new Lexer(input);
  let token = lexer.getNextToken();
  expect(token.type).toBe('{');
   token = lexer.getNextToken();
  expect(token.value).toBe("resource");
  expect(token.type).toBe('StringLiteral');
  token = lexer.getNextToken();
  expect(token.type).toBe(':');
  token = lexer.getNextToken();
  expect(token.value).toBe("song");
  token = lexer.getNextToken();
  expect(token.value).toBe(",");

  token = lexer.getNextToken();
  expect(token.type).toBe('}');
  token = lexer.getNextToken();
  expect(token.type).toBe(TokenType.EOF);

})


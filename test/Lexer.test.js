import Lexer from "../src/Lexer"
test('get single string token',()=>{
    const input = `{
        "resource": "song"
      }`
    let lexer = new Lexer(input);
    let token = lexer.getNextToken();
    expect(token.type).toBe('{');
     token = lexer.getNextToken();
    expect(token.value).toBe(`"resource"`);
    expect(token.type).toBe('StringLiteral');
    token = lexer.getNextToken();
    expect(token.type).toBe(':');
    token = lexer.getNextToken();
    expect(token.value).toBe(`"song"`);
    expect(token.type).toBe('StringLiteral');
    token = lexer.getNextToken();
    expect(token.type).toBe('}');
})

test('get single number token',()=>{
  const input = `{
      "target": 111
    }`
  let lexer = new Lexer(input);
  debugger;
  let token = lexer.getNextToken();
  expect(token.type).toBe('{');
   token = lexer.getNextToken();
  expect(token.value).toBe(`"target"`);
  expect(token.type).toBe('StringLiteral');
  token = lexer.getNextToken();
  expect(token.type).toBe(':');
  token = lexer.getNextToken();
  expect(token.type).toBe('NUMBER');
  expect(token.value).toBe('111');
  token = lexer.getNextToken();
  expect(token.type).toBe('}');
})

test('get single boolean token',()=>{
  const input = `{
      "resourceid": true
    }`
  let lexer = new Lexer(input);
  debugger;
  let token = lexer.getNextToken();
  expect(token.type).toBe(`{`);
   token = lexer.getNextToken();
  expect(token.value).toBe(`"resourceid"`);
  expect(token.type).toBe('StringLiteral');
  token = lexer.getNextToken();
  expect(token.type).toBe(':');
  token = lexer.getNextToken();
  expect(token.type).toBe('true');
  expect(token.value).toBe('true');
  token = lexer.getNextToken();
  expect(token.type).toBe('}');
})

// test('get first Token',()=>{
//   const input = `{
//       "page": "dailysongrecommend|userfm", // 日推|私人FM
//       "resource": "song", // 歌曲
//       "resourceid": true, // 歌曲id，如123
//       "target": 111, // 不感兴趣
//       "targetid": "button", // 点击按钮
//       "reason": "", // 不感兴趣理由，如推荐重复
//       "reason_type": "fixed" // 不感兴趣理由类型，固定
//     }`
//   let lexer = new Lexer(input);
//   debugger;
//   let token = lexer.getNextToken();
//   expect(token.type).toBe('OpenBrace');
//    token = lexer.getNextToken();
//   expect(token.value).toBe('page');
//   expect(token.type).toBe('StringLiteral');
// })
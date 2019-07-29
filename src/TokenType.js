/**
 * {
  "page": "dailysongrecommend|userfm", // 日推|私人FM
  "resource": "song", // 歌曲
  "resourceid": true, // 歌曲id，如123
  "target": 111, // 不感兴趣
  "targetid": "button", // 点击按钮
  "reason": "", // 不感兴趣理由，如推荐重复
  "reason_type": "fixed" // 不感兴趣理由类型，固定
}
 */

 //token 参考https://github.com/antlr/grammars-v4/blob/master/javascript/JavaScriptLexer.g4
//https://github.com/vtrushin/json-to-ast/blob/master/lib/tokenize.js
 const TokenType ={
    "OpenBrace":"OpenBrace",//左括号
    "CloseBrace":"}",//右括号
    "StringLiteral":"StringLiteral", //字符串类型
    "BitOr":"|",
    "SingleLineComment":"//",
    "COLON":":",
    "QUOTE":'"',
    "BOOLEN":"BOOLEN",
    "NUMBER":"NUMBER",
    "Comma":",",
    "EOFILE":"EOFILE",//end of file
 }

 export default TokenType;
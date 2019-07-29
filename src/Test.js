import Lexer from "./Lexer";

const input = `{
    "page": "dailysongrecommend|userfm", // 日推|私人FM
    "resource": "song", // 歌曲
    "resourceid": true, // 歌曲id，如123
    "target": 111, // 不感兴趣
    "targetid": "button", // 点击按钮
    "reason": "", // 不感兴趣理由，如推荐重复
    "reason_type": "fixed" // 不感兴趣理由类型，固定
  }`
//   debugger;
let  lex = new Lexer(input);
lex.getNextToken();
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

const TokenType = {
  OpenBrace: "{", //左括号
  CloseBrace: "}", //右括号
  StringLiteral: "StringLiteral", //字符串类型
  BitOr: "|",
  SingleSlash: "/",
  COLON: ":",
  QUOTE: '"',
  NUMBER: "NUMBER",
  COMMA: ",",
  EOFILE: "EOFILE" //end of file
};

const KeyWords = {
  true: "true",
  false: "false"
};

export { TokenType, KeyWords };

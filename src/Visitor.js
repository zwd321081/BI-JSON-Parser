/**基础visitor,其他visitor可以继承并override当前方法 */

import { AstNodeTypes } from "./AST";
export default class Visitor {
  visitDocument(doc) {}

  visitObject(obj) {}

  visitPair(pair) {}

  visitKey(key) {}

  visitString(jsonString) {}

  visitNumber(jsonNumber) {}

  visitValue(jsonValue) {}

  visitBoolean(jsonBoolen) {}

  visitNode(jsonNode) {}

  visitComment(jsonComment) {}

  visit(node) {
    switch (node.type) {
      case AstNodeTypes.DOCUMENT:
        this.visitDocument(node);
        break;
      case AstNodeTypes.OBJECT:
        this.visitObject(node);
        break;
      case AstNodeTypes.PAIR:
        this.visitPair(node);
        break;
      case AstNodeTypes.Key:
        this.visitKey(node);
        break;
      case AstNodeTypes.STRING:
        this.visitString(node);
        break;
      case AstNodeTypes.Number:
        this.visitNumber(node);
        break;
      case AstNodeTypes.VALUE:
        this.visitValue(node);
        break;
      case AstNodeTypes.COMMENT:
        this.visitComment(node);
        break;
      case AstNodeTypes.BOOLEAN:
        this.visitBoolean(node);
        break;
    }
  }
}

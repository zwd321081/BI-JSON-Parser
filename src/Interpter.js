import Visitor from "./Visitor";
import Environment from "./Environment";

export class Interpreter extends Visitor {
  constructor() {
    super();
    this.env = new Environment(null);
    this.currentKey = null;
  }

  visitValue(jsonValue) {
    jsonValue.children.forEach(item => {
      this.visit(item);
    });

    if (jsonValue.comment) {
      jsonValue.comment.accept(this);
    }
  }

  visitObject(obj) {
    obj.pairs.forEach(pair => {
      pair.accept(this);
    });
  }

  visitPair(pair) {
    pair.key.accept(this);
    pair.value.accept(this);
  }

  visitKey(jsonKey) {
    this.currentKey = null;
    this.currentKey = jsonKey.value;
  }

  visitComment(jsonComment) {
    this.env.define(this.currentKey, jsonComment.value);
  }

  visitString(jsonString) {
    console.log(jsonString);
  }

  getComment(key) {
    return this.env.resolve(key);
  }
}

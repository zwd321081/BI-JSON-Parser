export default class Environment {
  constructor(enclosing) {
    this.enclosing = enclosing;
    this.symtable = {};
  }

  define(key, value) {
    this.symtable[key] = value;
  }
  resolve(key) {
    return this.symtable[key];
  }
}

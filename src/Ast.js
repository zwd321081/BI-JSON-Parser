const AstNodeTypes = {
  OBJECT: "object",
  VALUE: "value",
  DOCUMENT: "document",
  KEY: "key",
  PAIR: "pair",
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean"
};

/**所有的初始节点 */
class JsonNode {
  constructor(type) {
    this.type = type;
  }

  /**采用visitor模式 */
  accept(visitor) {
    visitor.visit(this);
  }
}

class JsonDocument extends JsonNode {
  constructor() {
    super(AstNodeTypes.DOCUMENT);
    this.child = null;
  }
}

class JsonObject extends JsonNode {
  constructor() {
    super(AstNodeTypes.OBJECT);
    this.pairs = [];
  }
}

class JsonPair extends JsonNode {
  constructor(key, value) {
    super(AstNodeTypes.PAIR);
    this.key = key;
    this.value = value;
  }
}

class JsonKey extends JsonNode {
  constructor(value) {
    super(AstNodeTypes.KEY);
    this.value = value;
  }
}

class JsonString extends JsonNode {
  constructor(value) {
    super(AstNodeTypes.STRING);
    this.value = value;
  }
}

class JsonNumber extends JsonNode {
  constructor(value) {
    super(AstNodeTypes.NUMBER);
    this.value = value;
  }
}

class JsonBoolean extends JsonNode {
  constructor(value) {
    super(AstNodeTypes.BOOLEAN);
    this.value = value;
  }
}

export {
  JsonDocument,
  JsonObject,
  JsonPair,
  JsonKey,
  JsonString,
  JsonNumber,
  JsonBoolean
};

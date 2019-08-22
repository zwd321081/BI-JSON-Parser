const AstNodeTypes = {
  OBJECT: "object",
  VALUE: "value",
  DOCUMENT: "document",
  KEY: "key",
  PAIR: "pair",
  STRING: "string",
  NUMBER: "number",
  // PROPERTY: "property",
  COMMENT: "comment",
  BOOLEAN: "boolean",
  ARRAY: "array"
};

/**所有的初始节点 */
class JsonNode {
  constructor(type) {
    this.type = type;
  }

  /**采用visitor模式 */
  accept(visitor) {
    visitor.visitNode(this);
  }
}

class JsonDocument extends JsonNode {
  constructor() {
    super(AstNodeTypes.DOCUMENT);
    this.children = null;
  }

  accept(visitor) {
    visitor.visitDocument(this);
  }
}

class JsonObject extends JsonNode {
  constructor() {
    super(AstNodeTypes.OBJECT);
    this.pairs = [];
  }

  accept(visitor) {
    visitor.visitObject(this);
  }
}

class JsonPair extends JsonNode {
  constructor(key, value) {
    super(AstNodeTypes.PAIR);
    this.key = key;
    this.value = value;
  }

  accept(visitor) {
    visitor.visitPair(this);
  }
}

class JsonKey extends JsonNode {
  constructor(value) {
    super(AstNodeTypes.KEY);
    this.value = value;
  }

  accept(visitor) {
    visitor.visitKey(this);
  }
}

/**
 * pair里面的value
 */
class JsonValue extends JsonNode {
  constructor() {
    super(AstNodeTypes.VALUE);
    this.children = [];
    this.comment = null;
  }

  accept(visitor) {
    visitor.visitValue(this);
  }
}

class JsonString extends JsonNode {
  constructor(value) {
    super(AstNodeTypes.STRING);
    this.value = value;
  }

  accept(visitor) {
    visitor.visitString(this);
  }
}

class JsonNumber extends JsonNode {
  constructor(value) {
    super(AstNodeTypes.NUMBER);
    this.value = value;
  }
  accept(visitor) {
    visitor.visitNumber(this);
  }
}

class JsonBoolean extends JsonNode {
  constructor(value) {
    super(AstNodeTypes.BOOLEAN);
    this.value = value;
  }
  accept(visitor) {
    visitor.visitBoolean(this);
  }
}

class JsonComment extends JsonNode {
  constructor(value) {
    super(AstNodeTypes.COMMENT);
    this.value = value;
  }

  accept(visitor) {
    visitor.visitComment(this);
  }
}

export {
  JsonDocument,
  JsonObject,
  JsonPair,
  JsonKey,
  JsonValue,
  JsonString,
  JsonNumber,
  JsonComment,
  AstNodeTypes,
  JsonBoolean
};

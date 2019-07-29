class Token{
    constructor(type,value,line,column){
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }
}

export default Token;
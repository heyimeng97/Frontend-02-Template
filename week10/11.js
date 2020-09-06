
let regExp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g

let dic = ['Number', "WhiteSpace", "LineTerminator", "Multiply", "Divide", "Plus", "Minus"]

function* tokenize(source){
    let result = null;
    let lastIndex = 0;
    while(true){
        result = regExp.exec(source);
        lastIndex = regExp.lastIndex;
        if(!result)  break;

        if(regExp.lastIndex - lastIndex > result[0].length)
            break;


        let token = {
            type:null,
            value:null
        }
        for(let i = 1; i <= dic.length; i++){
            if(result[i])
                token.type = dic[i-1];
        }
        token.value = result[0];
        yield token;
    }
    yield {
        type:"EOF"
    }
}
//
// for(let token of tokenize("1024 + 10 * 25")){
//     console.log(token);
// }
//

let source  =[];

for(let token of tokenize("10 + 25 + 30")){
    if(token.type !== "WhiteSpace" && token.type !== "LineTerminator")
        source.push(token);
}

function Expression(source){
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "EOF"){
        let node = {
            type:"Expression",
            children:[source.shift(), source.shift()]
        }
        source.unshift(node);
        return node;
    }
    AdditiveExpression(source);
    return Expression(source);
}

function AdditiveExpression(source){
    if(source[0].type === "MultiplicativeExpression"){
        let node = {
            type:"AdditiveExpression",
            children:[source[0]]
        }
        source[0] = node;
        return AdditiveExpression(source);
    }

    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "Plus"){
        let node = {
            type:"AdditiveExpression",
            operator:"+",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }

    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "Minus"){
        let node = {
            type:"AdditiveExpression",
            operator:"-",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }

    if(source[0].type === "AdditiveExpression")
        return source[0]

    MultiplicativeExpression(source);
    return AdditiveExpression(source);
}

function MultiplicativeExpression(source){
    if(source[0].type === "Number"){
        let node = {
            type:"MultiplicativeExpression",
            children:[source[0]]
        }
        source[0] = node;
        return MultiplicativeExpression(source);
    }

    if(source[0].type === "MultiplicativeExpression" && source[1] && source[1].type === "Multiply"){
        let node = {
            type:"MultiplicativeExpression",
            operator:"*",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }

    if(source[0].type === "MultiplicativeExpression" && source[1] && source[1].type === "Divide"){
        let node = {
            type:"MultiplicativeExpression",
            operator:"/",
            children:[]
        }


        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }

    if(source[0].type === "MultiplicativeExpression")
        return source[0];

    return MultiplicativeExpression(source);
}

console.log(Expression(source));
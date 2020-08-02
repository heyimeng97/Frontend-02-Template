const net =require("net");
const parser = require("../toybrowser_HTML/parser.js")
const images =  require("images");
const render= require("../toybrowser_HTML/render.js")
class Request{
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 8088;
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};
        if(!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if(this.headers["Content-Type"] === "application/json")
            this.bodyText = JSON.stringify(this.body);
        else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded")
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join("&");

        this.headers["Content-Length"] = this.bodyText.length;
    }

    send(connection){
        return new Promise((resolve, reject) =>{
            let parser = new ResponseParser;
            if(connection){
                connection.write(this.toString());
            }
            else{
                connection = net.createConnection({
                    host:this.host,
                    port:this.port
                }, () => {
                    console.log("writing")
                    connection.write(this.toString());
                })
            }

            connection.on("data", (data) =>{
                // console.log(data.toString());
                parser = parser.receive(data.toString(),parser);
                if(parser.isFinished){
                    resolve(parser.response);
                    connection.end();
                }
            });

            connection.on('error',(err)=>{
                reject(err);
                connection.end();
            })
    });
    }



    toString(){
        return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join("\r\n")}`
                +`\r\n\r\n${this.bodyText}`
    }

}

class ResponseParser {
    constructor() {
        this.statusLine = "";
        this.headers = {};
        this.headersName = "";
        this.headerValue = "";
        this.bodyContent = [];
        this.receive = RequestParserStatusLine;
        this.isFinished = false;
        this.bodylength = 0;
    }

    get response(){
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText:RegExp.$2,
            headers:this.headers,
            body:this.bodyContent.join("")
        }
    }
}

function RequestParserStatusLine(String,request){
    let state = start;
    for(let c of String){
        state = state(c,request);
    }

    return request;
}

function start(c, request){
    if(c === "\r") return WaitingLineEnd;
    request.statusLine += c;
    return start;
}

function WaitingLineEnd(c,request){
    if(c === "\n") return WaitingHeaderName;
}

function WaitingHeaderName(c,request){
    if(c === ":") return WaitingHeaderSpace;
    if(c === "\r") return WaitingHeaderBlock;
    request.headersName += c;
    return WaitingHeaderName;
}

function WaitingHeaderSpace(c,request) {
    if(c === " ") return WaitingHeaderValue;
}

function WaitingHeaderValue(c,request) {
    if(c === "\r") {
        request.headers[request.headersName] = request.headerValue;
        request.headersName = "";
        request.headerValue = "";
        return WaitingHeaderBlock;
    }
    request.headerValue += c;
    return WaitingHeaderValue;
}

function WaitingHeaderBlock(c,request){
    if(c === "\n") return WaitingHeaderEnd;
}

function WaitingHeaderEnd(c,request) {
    if(c === "\r") return WaitingAllHeaderEnd;
    return WaitingHeaderName(c,request);
}

function WaitingAllHeaderEnd(c, request) {
    if(c === "\n") return WaitingBody;

}
function WaitingBody(c,request) {
    if (c === "\r") {
        if (request.bodylength === 0) return End;
        else return WaitingBodyLineEnd;
    }else{
        request.bodylength *= 16;
        request.bodylength += parseInt(c, 16);
        return WaitingBody;
    }
}

function WaitingBodyLineEnd(c,request) {
    if(c === "\n") return WaitingBodyContent;
}

function WaitingBodyContent(c,request){
    request.bodyContent.push(c);
    request.bodylength--;
    if(request.bodylength === 0) return WaitingBodyNewLine;
    return WaitingBodyContent;
}

function WaitingBodyNewLine(c,request){
    if(c === "\r") return WaitingBodyNewLineBlock;
}

function WaitingBodyNewLineBlock(c, request) {
    if(c=== "\n") return WaitingBody;

}


function End(c,request) {
    request.isFinished = true;
    return End;
}





void async function () {
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8088",
        path: '/',
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name:"YHM"
        }
    });
    let response = await request.send();

     // console.log(response);

     let DOM = parser.parseHTML(response.body)
    // console.log(JSON.stringify(DOM, null, "  "));

     let viewport = images(800,600);

     render.render(viewport, DOM)

    viewport.save("viewport.jpg");
}();


// let request = new Request({
//     method: "POST",
//     host: "127.0.0.1",
//     port: "8088",
//     path: '/',
//     headers: {
//         ["X-Foo2"]: "customed"
//     },
//     body: {
//         name: "YHM"
//     }
// });
// console.log(request.toString())
// let response = request.send()
/**
 * Created by Administrator on 2017/8/28 0028.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
//要根据不同的url显示不同的页面
http.createServer(function (req,res) {
  // var pathUrl = req.url;
  var pathUrl = path.join(__dirname,"public");
  console.log(pathUrl);
  fs.readFile(path.join(pathUrl,req.url),function (err,data) {
    if(err){
      throw err;
    }
    res.writeHead(200,{
      "Content-Type": mime.lookup(req.url)
    });
    res.end(data);
  });
}).listen(9999,function () {
  console.log("http://localhost:9999");
});
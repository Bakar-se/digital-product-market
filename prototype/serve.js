const http = require("http");
const fs = require("fs");
const file = "C:/Projects/store/prototype/assign-categories.html";

http.createServer((req, res) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("missing");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  });
}).listen(8765);

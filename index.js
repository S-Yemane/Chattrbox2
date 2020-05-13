var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');

const mime = require('mime');

var handleError = function (err, res) {
    var filePath = 'app/error.html';
    fs.readFile(filePath, function (err, data) {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    });
};

var server = http.createServer(function (req, res) {
    console.log('Responding to a request.');
    
    var filePath = extract(req.url);
    fs.readFile(filePath, function (err, data) {
        if (err) {
            handleError(err, res);
            return;
        } else {
            var fileExtension = mime.getExtension(filePath);
            var fileType = mime.getType(fileExtension);
            res.end(data);
        }
    });
});
server.listen(3000);
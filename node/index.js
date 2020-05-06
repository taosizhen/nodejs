var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.send('hello world!');
});
var server = app.listen(3001, function () {
    console.log('Listen on port 3001');
});

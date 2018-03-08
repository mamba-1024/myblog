var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
// var reload = require('reload');
var http = require('http');
var compress = require('compression');
var server = http.createServer(app);

var port = process.env.PORT || 3000;

app.use(compress());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('common.js', function (req, res) {
    var options = {
        root : __dirname + 'build'
    };
    res.sendFile('common.js', options, (err) => {
        "use strict";
        if(err){
            console.log(err)
        } else {
            console.log('bundle success')
        }
    })
});

app.get('*', (request, response)=>{
    let options = {
        root: path.join(__dirname, 'build')
    };
    response.sendFile('index.html', options, (err)=>{
        if(err){
            console.log(err)
        } else {
            console.log('index成功！')
        }
    })
});




// reload(server, app);

server.listen(port, () =>  {
    console.log('App (dev) is now running on port 3000!');
});


module.exports = app;
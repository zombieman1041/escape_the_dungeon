var static = require('node-static');
var http = require('http');

var port = process.env.PORT || 8080;
var directory = __dirname + '/public';

var file = new static.Server('./public');

// if we arent on heroku then we need to readjust the port and directory information and we know that because the port wont be set
if(typeof port == 'undefined' || !port){
    directory = './public';
    port = 8000;
}

// set up static web server that will deliver files from the filesystem
var file = new static.Server(directory);

// construct an http server that gets files from the file server
var app = http.createServer(function(request,response){
    request.addListener('end', 
    function(){
        file.serve(request,response);
    }
    ).resume();
}
).listen(port);
console.log('The server is running');


// var static = require('node-static');
// const http = require('http')

// const hostname = '127.0.0.1'
// const port = process.env.PORT || 8080;
// var directory = __dirname + '/public';

// // set up static web server that will deliver files from the filesystem
// var file = new static.Server('./public');

// const server = http.createServer(function(request,response){
//     request.addListener('end', 
//     function(){
//         file.serve(request,response);
//     }
//     ).resume();
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })

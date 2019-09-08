const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const port = 4242;

const server = http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    MongoClient.connect("mongodb://localhost:27042/", {useNewUrlParser: true},function (err, db) {
        if(err) throw err;
        var dbo = db.db("Wac");
        dbo.collection("students").find({Validated: 'In progress'}, {"sort" : ['Lastname', 'asc']}).toArray((err, items) => {
            response.write('<h1> List Users </h1>');
            response.write(JSON.stringify(items));
            response.end()
        });
    });
});

server.listen(port);
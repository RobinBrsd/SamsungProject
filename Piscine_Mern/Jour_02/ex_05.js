const http = require('http');
const qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const port = 4242;

const server = http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    if(request.method == "POST") {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);

            if(post['Admin'] === 'b')
                post['Admin'] = true;
            else 
                post['Admin'] = false;
            post['Id'] = parseInt(post['Id']),
            
            //console.log(post);
            MongoClient.connect("mongodb://localhost:27042/", {useNewUrlParser: true}, function (err, db) {
                if(err) throw err;
                var dbo = db.db("Wac");
                dbo.collection("students").insertOne(post, function(err, res) {
                  if (err) {
                    console.log("Operation echoue");
                    response.end("Operation echoue");
                    throw err;
                  } else {
                    console.log("Operation reussie");
                    db.close();
                    response.end("Operation reussie");
                  }
                });
            });
        });
    } else {
        response.end(
            `<form method="post">
                <legend> Inscription </legend><br/>
                <input type="number" name="Id" placeholder="id" required/><br/>
                <input type="text" name="Lastname" placeholder="Lastname" required/><br/>
                <input type="text" name="Firstname" placeholder="Firstname" required/><br/>
                <input type="email" name="Email" placeholder="Email" required/><br/>
                <input type="text" name="Phone" placeholder="Phone" required/><br/>
                <p> Validated : </p>
                <select name="Validated" required>
                    <option value="In progress"> In Progress </option>
                    <option value="Validated"> Validates </option>
                    <option value="Rejected"> Rejected </option>
                </select><br/>
                <p> Admin : </p>
                <select name="Admin" required>
                    <option value="a"> No </option>
                    <option value="b"> Yes </option>
                </select><br/><br/>
                <input type="submit" value="Inscription"/>
            </form>`
        );
    }
});

server.listen(port);
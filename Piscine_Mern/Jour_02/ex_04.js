var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27042/Wac", function (err, db) {
      if(err) 
        throw err;
      else 
        console.log("We are connected");
})
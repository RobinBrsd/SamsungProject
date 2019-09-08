const express = require('express');
const bodyParser = require('body-parser')
const crypto = require("crypto");
const MongoClient = require('mongodb').MongoClient;
var router = express.Router();

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true }));

function sha1(data) {
    return crypto.createHash("sha1").update(data, "binary").digest("hex");
}

router.get('/delete/:id', function (req, res) {
    id = parseInt(req.params.id);
    console.log(id);
    MongoClient.connect("mongodb://localhost:27042/",  {useNewUrlParser: true}, function (err, db) {
      var dbo = db.db("Wac");
      dbo.collection("Billets").deleteOne({ Id: id }, function (err, result) {
        db.close();
        res.redirect("http://localhost:3001/" + req.session.Login);
      });
    });
});

// Get All Billets
router.get('/getBillets/:login', function(req, res){
    var s = req.path;
    var login = s.substr(s.lastIndexOf('/') + 1);
    res.setHeader("Content-Type", "application/json");
    MongoClient.connect("mongodb://localhost:27042/", {useNewUrlParser: true}, function (err, db) {
        var dbo = db.db("Wac");
        dbo.collection("Users").findOne({Login: login}, function(err, user) {
            var Id = user.Id;
            dbo.collection("Billets").find({Id_User: Id}).toArray(function(err, item) {
                res.json(item);
            });
        });
    });
});

// Publier un billets
router.post('/publishBillet', function(req, res, next) {
    MongoClient.connect("mongodb://localhost:27042/", {useNewUrlParser: true}, function (err, db) {
            var dbo = db.db("Wac");
            if(req.session.id === undefined) {
                res.redirect("http://localhost:3001/users/login");
            }
            dbo.collection("Billets").find().sort({Id:-1}).limit(1).toArray(function(err, item) {
                maxId = item[0].Id + 1;
                if(req.body.Maison == undefined)
                    req.body.Maison = "";
                if(req.body.Jardin == undefined)
                    req.body.Jardin = "";
                if(req.body.Voiture ==undefined)
                    req.body.Voiture = "";
                
                var billet = {
                    Id: maxId,
                    Id_User: req.session.id,
                    Title: req.body.Title,
                    Content: req.body.Content,
                    Maison: req.body.Maison,
                    Jardin: req.body.Jardin,
                    Voiture: req.body.Voiture,
                }
                dbo.collection("Billets").insertOne(billet, function(err, response) {
                    if (err) {
                        db.close();
                        res.end("Operation Echoue");
                    } else {
                        db.close();
                        res.redirect("http://localhost:3001/" + req.session.Login);
                    }
                });
            });
        });
});

// Login Users
router.post('/login', function(req, res, next) {
      MongoClient.connect("mongodb://localhost:27042/", {useNewUrlParser: true}, function (err, db) {
          var dbo = db.db("Wac");
          dbo.collection("Users").findOne({Login: req.body.Login, Password: sha1(req.body.Password)}, function(err, user) {
              if(user) {
                  req.session.id = user.Id;
                  req.session.Login = user.Login;
                  res.redirect("http://localhost:3001/" + user.Login);
              } else {
                res.redirect("http://localhost:3001/users/login");
              }
          });
      });
});

// Register Users
router.post('/register', function(req, res, next) {
      if(req.body.Password === req.body.PasswordConfirm) {
          var password = sha1(req.body.Password);
          MongoClient.connect("mongodb://localhost:27042/", {useNewUrlParser: true}, function (err, db) {
            var dbo = db.db("Wac");
            dbo.collection("Users").find().sort({Id:-1}).limit(1).toArray(function(err, item) {
                maxId = item[0].Id + 1;
                var user = {
                    Id: maxId,
                    Login: req.body.Login,
                    Email: req.body.Email,
                    Password: password,
                    Admin: false
                }
                dbo.collection("Users").insertOne(user, function(err, response) {
                    if (err) {
                        db.close();
                        res.end("Operation Echoue");
                    } else {
                        db.close();
                        res.redirect("http://localhost:3001/users/login");
                    }
                });
            });
          });
      } else {
        res.end("Error : Password Doesn't Match !");
      }
});

module.exports = router;
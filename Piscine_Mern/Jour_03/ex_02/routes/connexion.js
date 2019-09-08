var express = require('express');
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('connexion', { title: 'Connexion' });
});

router.use( bodyParser.json() ); 
router.use(bodyParser.urlencoded({ 
  extended: true
}));

router.post('/', function(req, res, next) {
      const crypto = require("crypto");
      function sha1(data) {
          return crypto.createHash("sha1").update(data, "binary").digest("hex");
      }
      MongoClient.connect("mongodb://localhost:27042/", {useNewUrlParser: true}, function (err, db) {
          var dbo = db.db("Wac");
          dbo.collection("Users").findOne({Login: req.body.Login, Password: sha1(req.body.Password)}, function(err, user) {
              if(user) {
                res.end("Logged In");
              } else {
                res.redirect("/connexion");
              }
          });
      });
});

module.exports = router;
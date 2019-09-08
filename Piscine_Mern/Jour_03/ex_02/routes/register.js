var express = require('express');
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
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

      if(req.body.Password === req.body.PasswordConfirm) {
          var password = sha1(req.body.Password);
          var user = {
            Id: 1,
            Login: req.body.Login,
            Email: req.body.Email,
            Password: password,
            Admin: false
          }
          MongoClient.connect("mongodb://localhost:27042/", {useNewUrlParser: true}, function (err, db) {
            var dbo = db.db("Wac");
            dbo.collection("Users").insertOne(user, function(err, response) {
                if (err) {
                    res.end("Operation Echoue");
                } else {
                    db.close();
                    res.end("Success : Inscription Valider");
                }
            });
          });
      } else {
        res.end("Error : Password Doesn't Match !");
      }
});
module.exports = router;

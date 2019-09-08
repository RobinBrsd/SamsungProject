module.exports = {
    displayVersion: function() {
        console.log('Version 0.1');
    },

    displayHello: function(response) {
        console.log('Hello');
        // response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        // response.write('Hello !');
        // response.end();
    },

    createDirectory: function(dir) {
        var fs = require('fs');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
            console.log("OK");
        } else {
            console.log("KO");
        }
    },

    createFile: function(file) {
        const fs = require('fs');
        fs.writeFile(file, "New Files", function(err) {
            if(err) {
                return false;
            }
            return true;
        }); 
    },

    deleteDirectory: function(dir) {
        var rimraf = require("rimraf");
        rimraf(dir, function () {});
    },

    deleteFile: function(file) {
        const fs = require('fs');
        fs.unlinkSync(file);
    },
}


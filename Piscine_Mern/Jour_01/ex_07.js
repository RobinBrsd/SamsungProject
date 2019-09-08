var EventEmitter = require('events').EventEmitter;
var wac = new EventEmitter();
var moduleWac = require('./moduleWac');

wac.on('displayVersion', function(){
    moduleWac.displayVersion();
});

wac.on('displayHello', function(){
    moduleWac.displayHello();
});

wac.on('createDirectory', function(dir){
    moduleWac.createDirectory(dir);
});

wac.on('createFile', function(file){
    moduleWac.createFile(file);
});

wac.on('deleteDirectory', function(dir){
    moduleWac.deleteDirectory(dir);
});

wac.on('deleteFile', function(file){
    moduleWac.deleteFile(file);
});

wac.emit('displayHello');
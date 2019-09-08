var EventEmitter = require('events').EventEmitter;
var wac = new EventEmitter();
var moduleWac = require('./moduleWac');

wac.on('functions', function(funcs, opt){
    moduleWac[funcs](opt);
});

wac.emit('functions', 'createDirectory', 'oui');
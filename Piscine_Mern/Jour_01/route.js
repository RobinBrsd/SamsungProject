var url  = require('url');
var fs = require('fs');

function render(path, response) {
    fs.readFile(path, null, function(error, data){
        if (error) {
            response.writeHead(404);
            response.write('File not found !');
        } else {
            response.write(data);
        }
        response.end('Super, ca marche !');
    });
}

module.exports = {
    handleRoutes: function(request, response) {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        
        var path = url.parse(request.url).pathname;
        var urlSplit = path.split('/');
        var query = url.parse(request.url,true).query;

        if(urlSplit[2] != '') 
            var name = urlSplit[2];

        switch (path) {
            case '/':
                render('./index.html', response);
                break;
            case '/prenom/' + name:
                render('./name.html', response);
                if(query['age'] != undefined)
                    response.write('Bonjour ' + name + ', vous avez ' + query['age'] + ' ans');
                else
                    response.write('Bonjour ' + name);
                break;
            case '/prenom/':
                render('./name.html', response);
                if(query['age'] != undefined)
                    response.write('Bonjour Random, vous avez ' + query['age'] + ' ans');
                else
                    response.write('Bonjour Random');
                break;
            default:
                response.writeHead(404);
                response.write('Undefined Route');
                response.end();
        }
    }
}
var http = require('http');
var fileDescriptor = require('fs');
// code码
http.get('http://t.singer.tdf.ministudy.com/rest/status-code/index', function (response) {
  var body = '';
  response.on('data', function (chunk) {
    body += chunk;
  });
  response.on('end', function () {
    var fbResponse = JSON.parse(body);
    var cacheContent = "// logic status code cache from server!\n";
    for (var i in fbResponse) {
      cacheContent += '  ' + fbResponse[i].const + ':' + fbResponse[i].code + ',' + ' // ' + fbResponse[i].message + '\n'
      // cacheContent += 'var ' + fbResponse[i].const + '=' + fbResponse[i].code + ';' + ' // ' + fbResponse[i].message + '\n' + 'exports.' + fbResponse[i].const + '=' + fbResponse[i].const + ';' + '\n';
      // cacheContent += '{'+fbResponse[i].const + ':' + fbResponse[i].code  + '};' + ' // ' + fbResponse[i].message + '\n' ;
    }
    var data = 'var code = {' + cacheContent + '};' + '\n' + 'exports.code = code;'
    fileDescriptor.writeFile('src/views/js/code.js', data);
  });
});

console.log('cache common config from server:');

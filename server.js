var express = require('express');

var errors = {
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '203': 'Non-Authoritative Information (since HTTP/1.1)',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '207': 'Multi-Status (WebDAV)',
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Found',
    '303': 'See Other',
    '304': 'Not Modified',
    '305': 'Use Proxy',
    '306': '(Unused)',
    '307': 'Temporary Redirect',
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '407': 'Proxy Authentication Required',
    '408': 'Request Timeout',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '412': 'Precondition Failed',
    '413': 'Request Entity Too Large',
    '416': 'Requested Range Not Satisfiable',
    '417': 'Expectation Failed',
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '505': 'HTTP Version Not Supported',
    '506': 'Variant Also Negotiates (RFC 2295 )',
    '507': 'Insufficient Storage (WebDAV) (RFC 4918 )',
    '509': 'Bandwidth Limit Exceeded (Apache bw/limited extension)',
    '510': 'Not Extended (RFC 2774 )'
}


var app = express();

app.get('/', function(req, res) {
    var output = [
        '<h1>Fake server</h1>',
        '<h3>Use</h3>',
        '<pre><code>/fake/(error code)</code></pre>',
        '<h3>listening to error codes:</h3>',
        '<ul>'
    ];
    for (var error in errors) {
        output.push('<li><a href="/fake/' + error + '">' + error + ': ' + errors[error] + '<a></li>');
    }
    output.push('</ul>');
    res.send(output.join('\n\t'));
});

app.get('/fake/:code', function(req, res) {
    var code = req.params.code;
    if (code in errors) {
        res.jsonp(code, {
            error: errors[code],
            errorCode: code
        });
    }
});

app.listen(process.env.HORNET_PORT || 3000, function() {
    console.log('Hornet started http://localhost:' + (process.env.HORNET_PORT || 3000));
});
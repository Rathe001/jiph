var express  = require('express');
var app = express();
var requestProxy = require('express-request-proxy');

// configuration =================
app.use(express.static(__dirname + '/dist'));

// serve all asset files from necessary directories
app.use("/css", express.static(__dirname + "/css"));
app.use("/fonts", express.static(__dirname + "/fonts"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/js", express.static(__dirname + "/js"));

app.use('/api/v1/prototype/adGroups', requestProxy({
    url: "http://jiph.com/api/v1/prototype/adGroups"
}));

app.use('/api/v1/prototype/audiences', requestProxy({
    url: "http://jiph.com/api/v1/prototype/audiences"
}));

// serve index.html for all remaining routes, in order to leave routing up to angular
app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: __dirname + "/dist" });
});






// listen (start app with node server.js) ======================================
app.listen(80);
console.log("App listening on port 80 (local.jiph.com)");
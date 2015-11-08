var express  = require('express');
var app      = express();                               // create our app w/ express

// configuration =================
app.use(express.static(__dirname + '/dist'));                 // set the static files location /public/img will be /img for users

// serve all asset files from necessary directories
app.use("/css", express.static(__dirname + "/css"));
app.use("/fonts", express.static(__dirname + "/fonts"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/js", express.static(__dirname + "/js"));

// serve index.html for all remaining routes, in order to leave routing up to angular
app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: __dirname + "/dist" });
});

// listen (start app with node server.js) ======================================
app.listen(80);
console.log("App listening on port 80 (local.jiph.com)");
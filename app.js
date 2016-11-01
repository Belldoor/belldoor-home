﻿var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var nunjucks = require('nunjucks');

var app = express();

// TODO: Error Handler 만들기 d

(function (app) {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'html');

    nunjucks.configure('views', {
        autoescape: false,
        express: app,
        watch: true
    });

    var njglobals = require('nunjucks/src/globals');
    njglobals.stringify = JSON.stringify;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(methodOverride());
    
    app.use(express.static(path.join(__dirname, 'public')));
        
    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }
    
    require('./routes').delegate(app);

    
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
})(app);
var visualizeService = require('../services/visualize');
var moment = require('moment');

exports.delegate = function (app) {
    app.get("/visualize/status", status);
    app.get("/visualize/wordcloud", wordCloud);
};

function status(req, res, handleError) {
    visualizeService.status(function (err, rst) {
        if (err) return handleError(err);
        return res.render("visualize/status", {
            title: 'Server Status',
            description: 'Show Server Status',
            rst: rst,
            cTime: moment(new Date()).format('YYYY-MM-DD h:mm:ss a')
        });
    });
}

function wordCloud(req, res, handleError) {
    return res.render("./charts/dc", {
        title: 'dc.js', 
        year: new Date().getFullYear(), 
        message: 'Test dc.js'
    });
}

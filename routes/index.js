exports.delegate = function (app) {
    var controllers = [
        "common",        
        "visualize"
    ];
    
    controllers.forEach(function (controller) {
        require("./"+controller).delegate(app);
    });
    
    app.get("/", function (req, res) {
        res.render("./index", { title: 'Express', year: new Date().getFullYear() });
    });
};
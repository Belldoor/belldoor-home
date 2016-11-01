exports.delegate = function (app) {
    app.get("/about", about); 
};

function about(req, res, handleError) {
    res.render("/_common/about", {
        title: 'About', 
        year: new Date().getFullYear(), 
        message: 'Your application description page'
    });
}
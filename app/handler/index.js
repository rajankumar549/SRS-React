var helper = require("../helper")
var Handler = {
    GetMainPage: null,
    GetPostPage: null,
};

Handler.GetMainPage = function (req, res, next) {
    res.render("index", {
        fb: {}
    });
};

Handler.GetPostPage = async function (req, res, next) {
    postMessage = await helper.GetPostFbContent(req.params.id);
    res.render("index", {
        fb: postMessage || {}
    });
};


module.exports = Handler;
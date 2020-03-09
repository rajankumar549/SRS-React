var express = require("express");
var router = express.Router();
var Handller = require("../handler");

/* GET home page. */
router.all("/post/:id", Handller.GetPostPage);
router.all("/", Handller.GetMainPage);

module.exports = router;

var _ = require("lodash");
var fs = require("fs");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
dotenv.config();

var app = express();

// Middle Wares

app.set("views", path.join(__dirname, "./app/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./app/routes"));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log("[Error] ", err);
  if (err.name === "NotFoundError") {
    res.status(404).json({
      status: 404,
      msg: "Url not Found"
    });
  }

  res.status(500).render("error", {
    err: err
  });
});
// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
module.exports = app;

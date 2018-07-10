//khai bao thu vien
var db = require("./db");
var express = require("express"); //khai bao thu vien express
var bodyParser = require("body-parser"); //khai bao thu vien body-parser
//khai bao thu muc, duong dan, ham su dung
var config = require("./config");
var errorHandler = require("./middlewares/error-handler"); //khai bao su dung error-handler

var app = express();

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //tai nguyen co the truy cap boi bat cu ten mien nao
  res.header("Access-Control-Allow-Method", "GET,PUT,POST,DELETE"); //cho phep truy cap vao tai nguyen = cac phuong thuc
  res.header("Access-Control-Allow-Headers", "Content-Type"); //
  next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);

app.use("/roomticket", require("./routes/roomticket.route")());

app.use(errorHandler.errorHandler());

app.listen(process.env.PORT || config.PORT);

console.log("Server is listening on port " + config.PORT);
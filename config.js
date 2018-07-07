//file cau hinh js
//cac module su dung
var fs = require("fs"); //thao tac lien quan den file
var path = require("path");
var rootPath = __dirname; //__dirname bieu dien thu muc chua doan code dang thuc thi
var variables = JSON.parse(
  fs.readFileSync(path.join(rootPath, "config.json"), "utf8") //doc flile dong bo theo duong dan, kieu file la utf8
);

module.exports =
  variables;//khi server goi thi se tra ve variables

var router = require("express").Router();
var message = require("./../utils/message");
var roomticketController = require("../controller/roomticket.controller");

module.exports = () => {
  router.get("/getallroomticket", getAllRoomTicket);
  router.get("/:numberroom", getRoomTicket);
  router.post("/createRoom", createUpdateRoomTicket);
  router.post("/updateRoom",createUpdateRoomTicket);
  router.delete("/deleteRoom",deleteRoomTicket);
  //router.post("/",createDatabase);
  return router;
};

function getAllRoomTicket(req, res, next) {
  roomticketController
    .getAllRoomTicket()
    .then(function(response) {
      res.send(response);
    })
    .catch(function(err) {
      next(err);
    });
}

function getRoomTicket(req, res, next) {
  var request = {
    numberroom: req.params.numberroom
  };

  roomticketController
    .getRoomTicket(request)
    .then(function(response) {
      res.send(response);
    })
    .catch(function(err) {
      next(err);
    });
}
function createUpdateRoomTicket(req,res,next){
  var request ={
    numberroom : req.body.numberroom,
    status : false,
    employeeName : req.body.employeeName,
    route : req.body.route,
    timeStartService : req.body.timeStartService,
    timeEndService : req.body.timeEndService
  };
  roomticketController.createUpdateRoomTicket(request).then(function(response){
    res.send(response);
  }).catch(function(err){
    next(err);
  });
}

function deleteRoomTicket(req, res, next){
  var request ={
    numberroom : req.body.numberroom,
    status : true,
    employeeName : " ",
    route : " ",
    timeStartService : " ",
    timeEndService : " "
  };
  roomticketController.createUpdateRoomTicket(request).then(function(response){
    res.send(response);
  }).catch(function(err){
    next(err);
  });
}
// function createDatabase(req,res,next){
//   roomticketController.createDatabase().then(function(response){
//     res.send(response);
//   }).catch(function(err){
//     next(err);
//   });
// }

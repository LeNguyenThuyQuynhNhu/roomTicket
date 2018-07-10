var router = require("express").Router();
var roomticketController = require("../controller/roomticket.controller");

module.exports = () => {
  router.get("/", getAllRoomTicket);
  router.get("/:numberroom", getRoomTicket);
  router.post("/", createRoomTicket);
  router.put("/", updateRoomTicket);
  router.delete("/", deleteRoomTicket);
  router.post("/createDatabase",createDatabase); // tạo tổng các phòng
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
function updateRoomTicket(req, res, next) {
  var request = {
    numberroom: req.body.numberroom,
    status: false,
    companyName: req.body.companyName,
    employeeName: req.body.employeeName,
    route: req.body.route,
    timeStartService: req.body.timeStartService,
    timeEndService: req.body.timeEndService,
    timeEndRecent :new Date(req.body.timeEndRecent) // không cho update ngày bắt đầu thuê
  };
  roomticketController.updateRoomTicket(request)
    .then(function(response) {
      res.send(response);
    })
    .catch(function(err) {
      next(err);
    });
}

function deleteRoomTicket(req, res, next) {
  var request = {
    numberroom: req.body.numberroom
  };
  roomticketController.deleteRoomTicket(request)
    .then(function(response) {
      res.send(response);
    })
    .catch(function(err) {
      next(err);
    });
}

function createRoomTicket(req, res, next) {
  var request = {
    numberroom: req.body.numberroom,
    status: false,
    companyName: req.body.companyName,
    employeeName: req.body.employeeName,
    route: req.body.route,
    timeStartService: req.body.timeStartService,
    timeEndService: req.body.timeEndService,
    timeStartRecent : new Date(),
    timeEndRecent : new Date(req.body.timeEndRecent)
    
  };
  roomticketController.createRoomTicket(request)
    .then(function(response) {
      res.send(response);
    })
    .catch(function(err) {
      next(err);
    });
}
function createDatabase(req,res,next){
  roomticketController.createDatabase().then(function(response){
    res.send(response);
  }).catch(function(err){
    next(err);
  });
}

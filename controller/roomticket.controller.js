var RoomTicket = require("../models/roomticket.model");
var message = require("./../utils/message");
var config = require('./../config');

module.exports = {
  getAllRoomTicket: getAllRoomTicket,
  getRoomTicket: getRoomTicket,
  createUpdateRoomTicket: createUpdateRoomTicket
  //createDatabase: createDatabase
};

function getAllRoomTicket() {
  return new Promise((resolve, reject) => {
    RoomTicket.find({}).exec(function (err, roomtickets) {
      if (err) {
        reject(err);
      } else {
        resolve(roomtickets);
      }
    });
  });
}

function getRoomTicket(request) {
  return new Promise((resolve, reject) => {
    RoomTicket.findOne({
      numberroom: request.numberroom
    }).exec(function (err, roomticket) {
      if (err) {
        reject(err);
      } else {
        if (!roomticket) {
          reject({
            statusCode: 404,
            message: message.ERROR_MESSAGE.ROOM_TICKET.NOT_FOUND
          });
        } else {
          resolve(roomticket);
        }
      }
    });
  });
}

function createUpdateRoomTicket(request) {
  return promise = new Promise((resolve, reject) => {
    RoomTicket.findOne({
      numberroom: request.numberroom
    }).exec((err, roomTicketReq) => {
      if (err) {
        reject(err);
      } else {
        if (roomTicketReq) {
          roomTicketReq.employeeName = roomTicketReq.employeeName !== request.employeeName ? request.employeeName : roomTicketReq.employeeName;
          roomTicketReq.route= roomTicketReq.route !== request.route ? request.route : roomTicketReq.route;
          roomTicketReq.status = request.status; 
          roomTicketReq.timeStartService= roomTicketReq.timeStartService !== request.timeStartService ? request.timeStartService : roomTicketReq.timeStartService;
          roomTicketReq.timeEndService= roomTicketReq.timeEndService !== request.timeEndService ? request.timeEndService : roomTicketReq.timeEndService;
          roomTicketReq.save((err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          });
        } else {
          reject({
            statusCode: 400,
            message: message.ERROR_MESSAGE.ROOM_TICKET.NOT_FOUND
          });
        }
      }
    });
  });
}

// function createDatabase() {
//   return promise = new Promise((resolve, reject) => {
//     for (i = 1; i <= config.dateNumberRoom; i++) {
//       newRoomTicket = new RoomTicket({
//         numberroom: i,
//         status: true,
//         employeeName: " ",
//         route: " ",
//         timeStartService: 0,
//         timeEndService: 0
//       });
//       newRoomTicket.save((err, res) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve({
//             message: message.SUCCESS_MESSAGE.ROOM_TICKET.PASS_CREATE
//           });
//         }
//       });
//     }
//   });
// }
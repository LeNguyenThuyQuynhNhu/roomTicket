var RoomTicket = require("../models/roomticket.model");
var message = require("./../utils/message");
var config = require('./../config');

module.exports = {
  getAllRoomTicket: getAllRoomTicket,
  getRoomTicket: getRoomTicket,
  createUpdateRoomTicket: createUpdateRoomTicket,
  //createDatabase: createDatabase   tạo các phòng cho collection
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
          if (roomTicketReq.status && request.status) {
            //Nếu đã xóa rồi thì không xóa nữa
            reject({
              statusCode: 400,
              message: message.ERROR_MESSAGE.ROOM_TICKET.FAIL_DELETE
            });
          } else {
            if (roomTicketReq.employeeName === request.employeeName && roomTicketReq.status === request.status
              && roomTicketReq.route === request.route && roomTicketReq.timeEndService === request.timeEndService
              && roomTicketReq.timeStartService === request.timeStartService) {// nếu đã tạo room đó rồi thì không tạo lại được
              reject({
                statusCode: 400,
                message: message.ERROR_MESSAGE.ROOM_TICKET.EXIST
              });
            } else {// tạo hoặc update lên
              roomTicketReq.employeeName = roomTicketReq.employeeName !== request.employeeName ? request.employeeName : roomTicketReq.employeeName;
              roomTicketReq.route = roomTicketReq.route !== request.route ? request.route : roomTicketReq.route;
              roomTicketReq.status = request.status;
              roomTicketReq.timeStartService = roomTicketReq.timeStartService !== request.timeStartService ? request.timeStartService : roomTicketReq.timeStartService;
              roomTicketReq.timeEndService = roomTicketReq.timeEndService !== request.timeEndService ? request.timeEndService : roomTicketReq.timeEndService;
              roomTicketReq.save((err, res) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(res);
                }
              });
            }
          }
        } else {
          reject({// nhập số phòng sai
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
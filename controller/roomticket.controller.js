var RoomTicket = require("../models/roomticket.model");
var message = require("./../utils/message");
var config = require("./../config");

module.exports = {
  getAllRoomTicket: getAllRoomTicket,
  getRoomTicket: getRoomTicket,
  updateRoomTicket: updateRoomTicket,
  createRoomTicket: createRoomTicket,
  deleteRoomTicket: deleteRoomTicket,
  createDatabase: createDatabase  // tạo các phòng cho collection
};
function createDatabase() {
  return promise = new Promise((resolve, reject) => {
    for (i = 1; i <= config.dateNumberRoom; i++) {
      newRoomTicket = new RoomTicket({
        numberroom: i,
        status: true,
        employeeName:null,
        companyName:null,
        route:null,
        timeStartService:null,
        timeEndService:null,
        timeStartRecent:null,
        timeEndRecent: null
      });
      newRoomTicket.save((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            message: message.SUCCESS_MESSAGE.ROOM_TICKET.PASS_CREATE
          });
        }
      });
    }
  });
}

function getAllRoomTicket() {
  return new Promise((resolve, reject) => {
    RoomTicket.find({}).exec(function(err, roomtickets) {
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
    }).exec(function(err, roomticket) {
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

function updateRoomTicket(request) {
  return (promise = new Promise((resolve, reject) => {
    RoomTicket.findOne({
      numberroom: request.numberroom
    }).exec((err, roomTicketReq) => {
      if (err) {
        reject(err);
      } else {
        if (roomTicketReq) {
          //nếu phòng đó chưa thuê hoặc thông tin giống như cũ thì không update
          //hoặc phòng chư tạo bao giờ(status == true thì không update)
          //hoặc thời gian trả nhỏ hơn hoặc bằng thời gian thuê cũng không được
          if (TestRequest(roomTicketReq, request) == true||roomTicketReq.status == true
          ||TestTimeRecent(request)==true || (TestRequest(roomTicketReq, request) == true && roomTicketReq.status == true
          &&TestTimeRecent(request.timeEndRecent, request.timeStartRecent)==true)){
            reject({
              statusCode: 400,
              message: message.ERROR_MESSAGE.ROOM_TICKET.FAIL_UPDATE
            });
          } else {
            // tạo hoặc update lên
            roomTicketReq.employeeName =
              roomTicketReq.employeeName !== request.employeeName
                ? request.employeeName
                : roomTicketReq.employeeName;
            roomTicketReq.companyName =
              roomTicketReq.companyName !== request.companyName
                ? request.companyName
                : roomTicketReq.companyName;
            roomTicketReq.route =
              roomTicketReq.route !== request.route
                ? request.route
                : roomTicketReq.route;
            roomTicketReq.status = request.status;
            roomTicketReq.timeStartService =
              roomTicketReq.timeStartService !== request.timeStartService
                ? request.timeStartService
                : roomTicketReq.timeStartService;
            roomTicketReq.timeEndService =
              roomTicketReq.timeEndService !== request.timeEndService
                ? request.timeEndService
                : roomTicketReq.timeEndService;
            roomTicketReq.timeEndService =
              roomTicketReq.timeStartRecent = roomTicketReq.timeStartRecent; 
            roomTicketReq.timeEndRecent !== request.timeEndRecent
              ? request.timeEndRecent
              : roomTicketReq.timeEndRecent;
            
            roomTicketReq.save((err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            });
          }
        } else {
          reject({
            // nhập số phòng sai
            statusCode: 400,
            message: message.ERROR_MESSAGE.ROOM_TICKET.NOT_FOUND
          });
        }
      }
    });
  }));
}

function createRoomTicket(request) {
  return new Promise((resolve, reject) => {
    RoomTicket.findOne({
      numberroom: request.numberroom
    }).exec((err, roomTicketReq) => {
      if (err) {
        reject(err);
      } else {
        if (roomTicketReq) {
          // nhập đúng số phòng
          //nếu đã tạo rồi tạo giống thông tin thì không làm nữa
          if (roomTicketReq.status == false) {
            // nếu room đã được tạo rồi không tạo nữa
            reject({
              statusCode: 400,
              message: message.ERROR_MESSAGE.ROOM_TICKET.EXIST
            });
          } else {
            // tạo room
            if (TestRequestNull(request) == false && TestTimeRecent(request.timeEndRecent, request.timeStartRecent) ==false) {
              // kiểm tra request vào không null or " " và thời gian trả lớn hơn thuê
              roomTicketReq.employeeName = request.employeeName;
              roomTicketReq.route = request.route;
              roomTicketReq.status = request.status;
              roomTicketReq.timeStartService = request.timeStartService;
              roomTicketReq.timeEndService = request.timeEndService;
              roomTicketReq.companyName = request.companyName;
              roomTicketReq.timeStartRecent = request.timeStartRecent;
              roomTicketReq.timeEndRecent = request.timeEndRecent;
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
                message: message.ERROR_MESSAGE.ROOM_TICKET.CREATE_FAIL
              });
            }
          }
        } else {
          reject({
            // nhập số phòng sai
            statusCode: 400,
            message: message.ERROR_MESSAGE.ROOM_TICKET.NOT_FOUND
          });
        }
      }
    });
  });
}

function deleteRoomTicket(request) {
  return (promise = new Promise((resolve, reject) => {
    RoomTicket.findOne({
      numberroom: request.numberroom
    }).exec((err, roomTicketReq) => {
      if (err) {
        reject(err);
      } else {
        if (roomTicketReq) {
          if (roomTicketReq.status == true) {
            //Nếu đã xóa rồi thì không xóa nữa
            reject({
              statusCode: 400,
              message: message.ERROR_MESSAGE.ROOM_TICKET.FAIL_DELETE
            });
          } else {
            roomTicketReq.status = true;
            roomTicketReq.companyName = null;
            roomTicketReq.employeeName = null;
            roomTicketReq.route = null;
            roomTicketReq.timeEndService = null;
            roomTicketReq.timeStartService = null;
            roomTicketReq.timeStartRecent = null;
            roomTicketReq.timeEndRecent = null;
            roomTicketReq.save((err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            });
          }
        } else {
          reject({
            // nhập số phòng sai
            statusCode: 400,
            message: message.ERROR_MESSAGE.ROOM_TICKET.NOT_FOUND
          });
        }
      }
    });
  }));
}

function TestRequestNull(request) {
  if ((request.employeeName == null || request.employeeName == " " )||
    (request.route == null || request.route == " ") ||
    (request.companyName == null || request.companyName == " ") ||
    (request.timeStartService == null || request.timeStartService == " ") ||
    (request.timeEndService == null || request.timeEndService == " ") ||
    (request.timeEndRecent == null || request.timeEndRecent == " ") ||
    ((request.employeeName && request.route && request.companyName && 
     request.timeStartService && request.timeEndService && request.timeEndRecent ==null)||request.employeeName && request.route && request.companyName && 
     request.timeStartService && request.timeEndService && request.timeEndRecent == " ")
  ) {
    return true;
  } else {
    return false;
  }
}

function TestRequest(roomTicketReq,request){
  if(roomTicketReq.employeeName === request.employeeName &&
    roomTicketReq.route === request.route &&
    roomTicketReq.timeEndService === request.timeEndService &&
    roomTicketReq.timeStartService === request.timeStartService &&
    roomTicketReq.companyName === request.companyName &&
    roomTicketReq.timeEndRecent == request.timeEndRecent){
    return true;
  }else return false;
}a

function TestTimeRecent(end, start){
  if( end.getTime() < start.getTime()){
    return true
  }else return false;

}



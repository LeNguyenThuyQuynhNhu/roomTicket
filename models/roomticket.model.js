var mongoose = require("mongoose");

var Schema = mongoose.Schema; //dinh nghia 1 kieu cau truc cho mongo

var ticketSchema = new Schema({
  // col: {
  //   type: Number,
  //   required: true
  // },
  // row: {
  //   type: Number,
  //   required: true
  // },
  numberroom:{
    type: Number,
    required: true
  },
  status: {//Co hoat dong hay khong
    type: Boolean,
    required: true,
    default:true
  },
  employeeName: {
    type: String,
    required: true
  },
  route:{// tuyến đường
    type: String,
    required: true
  },
  timeStartService:{ // làm việc từ mấy giờ
    type :Number,
    required: true
  },
  timeEndService:{ // tới mấy h
    type :Number,
    required: true
  }
});

var roomTicket = mongoose.model("ticket_office", ticketSchema);
module.exports = roomTicket;

var mongoose = require("mongoose");

var Schema = mongoose.Schema; //dinh nghia 1 kieu cau truc cho mongo

var ticketSchema = new Schema({
  numberroom:{
    type: Number,
    required: true
  },
  status: {//Co hoat dong hay khong
    type: Boolean,
    required: true,
    default:true
  },
  companyName:{
    type: String
  },
  employeeName: {
    type: String
  },
  route:{// tuyến đường
    type: String
  },
  timeStartService:{ // làm việc từ mấy giờ
    type :Number
  },
  timeEndService:{ // tới mấy h
    type :Number
   }, 
   timeStartRecent:{
     type: Date
  },
  timeEndRecent:{
    type: Date
  }
});

var roomTicket = mongoose.model("ticket_office", ticketSchema);
module.exports = roomTicket;

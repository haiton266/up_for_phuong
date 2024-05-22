const mongoose = require("mongoose");
function convertBase64(buffer) {

  return Buffer.from(buffer, 'base64')

}
const MessageSchema =  mongoose.Schema(
  {
    conversationId: {
      ref: 'Conversation',
      type: String,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mess_text: {
      type: String,
      // required: true,
      default: null,
    },
    mess_image: {
      data: Buffer,
      contentType: String,
      // default: null,
    },
    recalled:{
      type: Boolean,
      default:false,
    },
  },
{ timestamps: true }
);

exports.Message  = mongoose.model("Message", MessageSchema);

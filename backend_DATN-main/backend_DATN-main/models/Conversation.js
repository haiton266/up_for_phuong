const mongoose = require("mongoose");

const ConversationSchema =  mongoose.Schema(
  {
	participants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
		mess_text: {
			type: String,
			// required: true,
      default:null,
		},
		unRead :{
			type: Number,
			default:0
		},
		receiverId :{
			type: String,
			default:null
		}
  },
  { timestamps: true }
);

exports.Conversation = mongoose.model("Conversation", ConversationSchema);

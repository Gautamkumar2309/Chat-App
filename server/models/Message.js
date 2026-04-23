import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
   senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
   recevierId: {type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
   text: {types: String, },
   image: {type: String, },
   seen: {typr: Boolean, defualt: false}
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;
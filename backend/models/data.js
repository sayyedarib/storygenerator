// Mongoose Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    id: { type: String, required: true },
    prompt: {
        type: String,
        required: true
    },
    bot: {
        type: String,
    },
    upvotes: {
        users: [String], // An array of user IDs who upvoted
        count: { type: Number, default: 0 } // Total count of upvotes
    }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

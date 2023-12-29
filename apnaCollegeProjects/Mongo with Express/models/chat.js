const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: { // Corrected field name from 'msg' to 'message'
        type: String,
        required: true
    },
    created_at: {
        type: Date, // Corrected type to 'Date'
        required: true
    }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

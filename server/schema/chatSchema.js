const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    pk : {
        type : String
    },
    sk : {
        type : String,
        default : "CHAT"
    },
    userId :  {
        type : String
    },
    question :  {
        type : String
    },
    answer :  {
        type : String
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

let chat = mongoose.model('chat', chatSchema);

module.exports = {
    chat
}
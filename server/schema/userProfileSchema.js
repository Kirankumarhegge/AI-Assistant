const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

let userId = uuidv4();

const userProfileSchema = new mongoose.Schema({
    id : String,
    pk : {
        type : String,
        default : userId
    },
    sk : {
        type : String,
        default : "PROFILE"
    },
    firstName : {
        type : String,
        default : ""
    },
    lastName : {
        type : String,
        default : ""
    },
    birthDate : {
        type : String,
        default : ""
    },
    gender : {
        type : String,
        default : ""
    },
    isProfileComplete : {
        type : Boolean,
        default : false
    },
    userId : {
        type : String,
        default : userId
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String, 
        required: true
    }
});

const userProfile = mongoose.model('users', userProfileSchema);

module.exports = {
    userProfile
}
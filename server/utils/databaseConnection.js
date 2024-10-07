require('dotenv').config();
const mongoose = require("mongoose");


let mongoDBConnection = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connection Done");
    }
    catch(error){
        console.log("Error In DB Connection :: ", JSON.stringify(error));
        throw error;
    }
}

module.exports = {
    mongoDBConnection
}
const logI = "-- INFO -- AUTH FLOW SERVICE :: ";
const logE = "-- ERROR -- AUTH FLOW SERVICE :: ";
const bcrypt = require('bcrypt');
const { userProfile } = require('../schema/userProfileSchema.js');
const saltRound = 10;


const signIn = async (req, res) => {
    try{
        console.log(logI, "signIn :: ", req.body);

        let { email, password } = req.body;
        let userDetails = await userProfile.findOne({ email : email });

        if(!userDetails){
            console.log("userDetails");
            return res.status(200).json({ message: "User not found!" });
        }

        let hashedPassword = userDetails.password;
        console.log("Login hash password :: ", hashedPassword, "  password :: ", password);
        let isPasswordMatched = await bcrypt.compare(password, hashedPassword);

        console.log(isPasswordMatched)

        if(isPasswordMatched){
            return res.status(200).json(userDetails);
        }
        else{
            return res.status(200).json({ message: "Password incorrect!" });
        }
    }
    catch(err){
        console.log(logE, "signIn :: ", JSON.stringify(error));
        return res.status(404).json({ message: err.message });
    }
}


const signUp = async (req, res) => {
    try{
        console.log(logI, "signUn :: ", req.body);

        let { email, password } = req.body;
        let hashedPassword = await bcrypt.hash(password, saltRound);
        console.log("sign up hash password :: ", hashedPassword, "  and password :: ", password);
        let userData = {
            email : email,
            password : hashedPassword
        }
        let userDetails = await userProfile.create(userData);

        res.status(200).json(userDetails);
    }
    catch(err){
        console.log(logE, "signUp :: ", err.message);
        return res.status(404).json({ message: err.message });
    }
}

const updateUserProfile = async (req, res) => {
    try{
        console.log(logI, "updateUserProfile :: ", req.body) 
        req.body.updatedAt = Date.now();

        let userDetails = await userProfile.findOneAndUpdate( {userId : req.params.userId}, req.body, { new : true});
        
        res.status(200).json(userDetails);
    }
    catch(err){
        console.log(logE, "profile Update :: ", err.message);
        return res.status(404).json({ message: err.message });
    }
}

const getUserProfileByEmailId = async (req, res) => {
    try{
        console.log(logI, "Get User Profile By Email Id :: ", req) 

        let userDetails = await userProfile.findOne( {email : req.params.email} );
        
        res.status(200).json(userDetails);
    }
    catch(err){
        console.log(logE, "profile Update :: ", err.message);
        return res.status(404).json({ message: err.message });
    }
}


module.exports = {
    signIn,
    signUp,
    updateUserProfile,
    getUserProfileByEmailId
}
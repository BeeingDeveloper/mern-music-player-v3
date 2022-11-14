const router = require('express').Router();
const user = require('../models/user.model');

const admin = require("../config/firebase.config");



//GET LOGIN STATUS---------------------------------------------------------------------
router.get("/login", async(req, res)=>{
    if(!req.headers.authorization){
        return res.status(200).send({message: "INVALID TOKEN"});
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if(!decodeValue){
            return res.status(505).json({message: "UN AUTHORIZED USER"});
        }else{
            const userExists = await user.findOne({"user_id": decodeValue.user_id});
            if(!userExists){
                createNewUser(decodeValue, req, res);
            }else{
                updateExistingUser(decodeValue, req, res);
            }
        }
    } catch (error) {
        return res.status(505).json({message: error});
    }
});

const createNewUser = async(decodeValue, req, res)=>{
    const newUser = new user({
        name:           decodeValue.name,  
        email:          decodeValue.email,  
        imageURL:       decodeValue.picture,
        user_id:        decodeValue.user_id,
        email_verified: decodeValue.email_verified,
        role:           "member",
        auth_time:      decodeValue.auth_time,
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).send({user: savedUser})
    } catch (error) {
        res.status(400).send({success: false, msg: error})
    }
}
const updateExistingUser = async(decodeValue, req, res)=>{
    const userId = {user_id: decodeValue.user_id};
    const options = {
        upsert: true,
        new: true
    }

    try {
        const result = await user.findOneAndUpdate(userId, {auth_time: decodeValue.auth_time}, options)
        res.status(200).send({user: result});
    } catch (error) {
        res.status(400).send({success: false, msg: error});
    }

}

module.exports = router
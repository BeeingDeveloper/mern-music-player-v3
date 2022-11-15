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

router.get("/get-users", async(req, res)=>{
    const allUsers = await user.find();
    try {
        return res.status(200).send({success: true, data: allUsers});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});




router.put('/update/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    const updatedData = {
        name: req.body.name,  
        email: req.body.email,  
        imageURL: req.body.imageURL,
        user_id: req.body.user_id,
        email_verified: req.body.email_verified,
        role: req.body.role,
        auth_time: req.body.auth_time,
    }

    const updateUser = await user.findByIdAndUpdate(id, updatedData);
    try {
        return res.status(200).send({success: true, data: updateUser});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"})
    }
})




router.delete('/delete/:id', async(req, res)=>{
    const id = {_id: req.params.id};
    const deletedUser = await user.findByIdAndDelete(id);
    try {
        return res.status(200).send({success: true, data: deletedUser});
    } catch (error) {
        return res.status(500).send({success: false, message: "INTERNAL SERVER ERROR"})
    }
})

module.exports = router
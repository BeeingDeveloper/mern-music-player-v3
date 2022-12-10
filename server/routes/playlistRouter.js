const router = require('express').Router();
const playlist = require('../models/playlist.model');


router.post('/create', async(req, res)=>{
    const newPlaylist = playlist({
        name:  req.body.name,
        userId: req.body.userId,
    });

    try {
        const savedPlaylist = await newPlaylist.save();
        return res.status(200).send({success: true, data: savedPlaylist});
    } catch (error) {
        return res.status(400).send({success: false, msg: 'INTERNAL SERVER ERROR'});
    }
});





router.get('/get-playlists', async(req, res)=>{
    const playlists = await playlist.find();
    try {
        return res.status(200).send({success: true, data: playlists});
    } catch (error) {
        return res.status(400).send({success: false, msg: 'INTERNAL SERVER ERROR'});
    }
});



router.put('/update/:id', async(req, res)=>{

    const playlistId = {_id: req.params.id};

    // const updatedData = {

    // }
})

module.exports = router;
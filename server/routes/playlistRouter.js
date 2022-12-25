const router = require('express').Router();
const playlist = require('../models/playlist.model');


router.post('/create', async(req, res)=>{
    const newPlaylist = playlist({
        name:  req.body.name,
        userId: req.body.userId,
        songItem: req.body.songItem
    });

    try {
        const savedPlaylist = await newPlaylist.save();
        return res.status(200).send({success: true, data: savedPlaylist});
    } catch (error) {
        return res.status(400).send({success: false, msg: 'INTERNAL SERVER ERROR'});
    }
});





router.get('/get-playlists', async(req, res)=>{
    const playlists = await playlist.find().populate('songItem');
    try {
        return res.status(200).send({success: true, data: playlists});
    } catch (error) {
        return res.status(400).send({success: false, msg: 'INTERNAL SERVER ERROR'});
    }
});



router.put('/update/:id', async(req, res)=>{

    // const playlistId = {_id: req.params.id};
    
    // const updatedElm = playlist.songItem.push(playlistId);
    
    // const updatedPlaylist = {
    //     name: req.body.name,
    //     userId: req.body.userId,
    //     songItem: updatedElm
    // }

    try {
        const updatedPlaylist = await playlist.findByIdAndUpdate(req.params.id, {'$push':{'songItem':req.body.songItem}});

        return res.status(200).send({success: true, data: updatedPlaylist});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
})

module.exports = router;
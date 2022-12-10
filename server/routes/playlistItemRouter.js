const router = require('express').Router();
const playlistItem = require('../models/playlistItem.model')

router.post('/add-to-playlist', async(req, res)=>{
    try {
        const songItem = playlistItem({
            playlistId: req.body.playlistId,
            userId: req.body.userId,
            name: req.body.name,  
            imageURL: req.body.imageURL,
            songURL: req.body.songURL,
            album: req.body.album,
            artist: req.body.artist,
            language: req.body.language,
            category: req.body.category,
        })

        const savedToPlaylist = await songItem.save();
        return res.status(200).send({success: true, data: savedToPlaylist});

    } catch (error) {
        return res.status(500).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});

module.exports = router;
const router = require('express').Router();
// const { rawListeners, findByIdAndDelete } = require('../models/song.model');
const song = require('../models/song.model');


//CREATE NEW SONG-----------------------------------------------------------------------
router.post('/create', async (req, res)=>{
    const newSong = song({
        name: req.body.name,  
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
    });

    try {
        const savedSong = await newSong.save();
        return res.status(200).send({success: true, data: savedSong});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});
//---------------------------------------------------------------------------------------







//GET ALL SONGS--------------------------------------------------------------------------
router.get('/all-songs', async(req, res)=>{
    const songs = await song.find().sort({createdAt: 1});
    try {
        return res.status(200).send({success: true, data: songs});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});
//---------------------------------------------------------------------------------------






//GET SINGLE SONG------------------------------------------------------------------------
router.get('/single-song/:id', async(req, res)=>{
    const songId = {_id: req.params.id};
    const singleSong = await song.findOne(songId);

    try {
        return res.status(200).send({success: true, data: singleSong});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
})
//--------------------------------------------------------------------------------------





//UPDATE SONG----------------------------------------------------------------------------
router.put('/update/:id', async(req, res)=>{

    const songId = {_id: req.params.id};

    const updateCandidate = {
        name: req.body.name,  
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
    };

    const options = {
        upsert: true,
        new: true
    }
        const updateSong = await song.findByIdAndUpdate(songId, updateCandidate, options);

    try {
        return res.status(200).send({success: true, data: updateSong});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});
//--------------------------------------------------------------------------------------







//DELETE SONG---------------------------------------------------------------------------
router.delete('/delete/:id', async(req, res)=>{
    const songId = {_id: req.params.id};
    const deleteCandidate = await song.findByIdAndDelete(songId);

    try {
        return res.status(200).send({success: true, data: deleteCandidate});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});
//--------------------------------------------------------------------------------------


module.exports = router;
const router = require('express').Router();
const album = require('../models/album.model');

//CREATE NEW ALBUMS---------------------------------------------------------------------
router.post('/create', async(req, res)=>{
    const newAlbum = album({
        name: req.body.name,  
        imageURL: req.body.imageURL,
    });

    try {
        const savedAlbum = await newAlbum.save();
        return res.status(200).send({success: true, data: savedAlbum});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});
//--------------------------------------------------------------------------------------







//GETTING ALL ALBUMS--------------------------------------------------------------------
router.get('/all-albums', async(req, res)=>{
    const albums = await album.find().sort({createdAt: 1});

    try {
        return res.status(200).send({success: true, data: albums});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"})
    }
});
//--------------------------------------------------------------------------------------






//GET SINGLE ALBUMS---------------------------------------------------------------------
router.get('/single-album/:id', async(req, res)=>{
    const songId = {_id: req.params.id};
    const singleSong = await album.findOne(songId);

    try {
        return res.status(200).send({success: true, data: singleSong});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});
//--------------------------------------------------------------------------------------







//UPDATE ALBUM--------------------------------------------------------------------------
router.put('/update/:id', async(req, res)=>{
    const songId = {_id: req.params.id};
    const updateCandidate = {
        name: req.body.name,  
        imageURL: req.body.imageURL,
    }

    const options = { upsert: true, new: true };

    const updatedAlbum = await album.findByIdAndUpdate(songId, updateCandidate, options);

    try {
        return res.status(200).send({success: true, data: updatedAlbum});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});
//--------------------------------------------------------------------------------------







//DELETE ALBUM--------------------------------------------------------------------------
router.delete('/delete/:id', async(req, res)=>{
    const songId = {_id: req.params.id};

    const deleteCandidate = await album.findByIdAndDelete(songId);
    try {
        return res.status(200).send({success: true, data: deleteCandidate});
    } catch (error) {
        return res.status(400).send({success: false, data: "INTERNAL SERVER ERROR"});
    }
})


module.exports = router;

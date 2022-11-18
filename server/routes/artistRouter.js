const router = require('express').Router();
const artist = require('../models/artist.model');




//CREATE NEW ARTIST--------------------------------------------------------------------
router.post('/create', async(req, res)=>{
    const newArtist = artist({
        name: req.body.name,  
        imageURL: req.body.imageURL,
    });

    try {
        const savedArtist = await newArtist.save();
        return res.status(200).send({success: true, data: savedArtist});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});
//------------------------------------------------------------------------------------






//GET ALL ARTISTS---------------------------------------------------------------------
router.get('/all-artists', async(req, res)=>{
    const artists = await artist.find().sort({createdAt: 1});

    try {
        return res.status(200).send({success: true, data: artists})
    } catch (error) {
        return res.status(400).send({success: true, msg: "INTERNAL SERVER ERROR"});
    }
});
//------------------------------------------------------------------------------------






//GET SINGLE ARTST--------------------------------------------------------------------
router.get('/single-artist/:id', async(req, res)=>{
    const artistId = {_id: req.params.id};
    const singleArtist = await artist.findOne(artistId);

    try {
        return res.status(200).send({success: true, data: singleArtist});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});
//------------------------------------------------------------------------------------






//UPDATE ARTIST-----------------------------------------------------------------------
router.put('/update/:id', async(req, res)=>{
    const artistId = {_id: req.params.id};
    const updateCandidate = {
        name: req.body.name,
        imageURL: req.body.imageURL
    }
    const updatedArtist = await artist.findByIdAndUpdate(artistId, updateCandidate);
    try {
        return res.status(200).send({success: true, data: updatedArtist});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});
//------------------------------------------------------------------------------------






//DELETE ARTIST-----------------------------------------------------------------------
router.delete('/delete/:id', async(req, res)=>{
    const artistId = {_id: req.params.id};
    const deleteArtist = await artist.findByIdAndDelete(artistId);
    try {
        return res.status(200).send({success: true, data: deleteArtist});
    } catch (error) {
        return res.status(400).send({success: false, msg: "INTERNAL SERVER ERROR"});
    }
});






module.exports = router;
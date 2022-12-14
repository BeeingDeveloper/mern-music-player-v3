const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 5500;



// SETUP MIDDLEWARE--------------------------------------------------------------
app.use(cors());
app.use(express.json());
//-------------------------------------------------------------------------------







//DATABSE CONNECTION-------------------------------------------------------------
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});


// const connection = mongoose.connection;

mongoose.connection.once("open", ()=>{
    console.log(`Connected to MongoDB Databse...`);
})
//-------------------------------------------------------------------------------







//ROUTING SETUP------------------------------------------------------------------
const songRouter = require('./routes/songRouter');
app.use('/api/songs/', songRouter);

const artistRouter = require('./routes/artistRouter');
app.use('/api/artists/', artistRouter);

const albumRouter = require('./routes/albumRouter');
app.use('/api/albums/', albumRouter);

const userRouter = require('./routes/userRouter');
app.use('/api/users/', userRouter);

const playlistRouter = require('./routes/playlistRouter');
app.use('/api/playlist', playlistRouter);

// const playlistItemRouter = require('./routes/playlistItemRouter');
// app.use('/api/playlistItem', playlistItemRouter);





//START SERVER-------------------------------------------------------------------
app.listen(port, ()=>{
    console.log(`Server running at port: ${port}`);
})
//-------------------------------------------------------------------------------

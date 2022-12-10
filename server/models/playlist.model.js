const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name:  {type: String, required: true},
    userId: {type: String, required: true},
},{
    timestamps: true
})

module.exports = mongoose.model('playlist', playlistSchema);
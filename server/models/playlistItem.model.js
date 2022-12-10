const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaylistItemSchema = new Schema({
    playlistId: {type: String, required: true},
    userId: {type: String, required: true},
    name: {type: String, required: true},  
    imageURL: {type: String, required: true},
    songURL: {type: String, required: true},
    album: {type: String, required: true},
    artist: {type: String, required: true},
    language: {type: String, required: true},
    category: {type: String, required: true},
})

module.exports = mongoose.model('playlistItem', PlaylistItemSchema);
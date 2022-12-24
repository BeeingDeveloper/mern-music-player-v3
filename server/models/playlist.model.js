const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name:  {type: String, required: true},
    userId: {type: String, required: true},
    songItem: [{type: Schema.Types.ObjectId, ref: "song" }]
},{
    timestamps: true
})

module.exports = mongoose.model('playlist', playlistSchema);
// .populate("song/playlistItem");
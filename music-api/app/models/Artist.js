const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    title: {
        type: String,
        required: true,
        unique: true,
    }, 
    published: {
        type: Boolean,
        required: true,
        default: false
    }, 
    image: String,
    information: String
});

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;
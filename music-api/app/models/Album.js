const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema ({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    title: {
        type: String,
        required:true,
        unique: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required:true
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    }, 
    yearOfIssue: Number,
    coverImage: String
});
AlbumSchema.plugin(idvalidator);
const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;
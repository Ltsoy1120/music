const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;

const TrackSchema = new Schema ({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required:true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required:true
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    }, 
    duration: String,
    number: Number
});
TrackSchema.plugin(idvalidator);
const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;
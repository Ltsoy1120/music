const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth.js');
const permit = require('./middleware/permit.js');

const Track = require('./models/Track');

const createRouter = () => {
    
    router.get('/', async (req, res) => {
        let filter ={};
        if(req.query.album){
            filter.album = req.query.album;
        }
        
        try{
            const tracks = await Track.find(filter).populate('album', 'title').sort({number: 1});            
            res.send(tracks);
        }catch(e){
            res.status(500).send(e);
        }
    });
    router.post('/', [auth, permit('admin', 'user')], async (req,res) => {
        const trackData = req.body;
        let track = new Track(trackData);

        track.user = req.user._id;
        try{
            await track.save();
            res.send(track);
        }catch(e){
            res.status(400).send(e);
        }
    });
    router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
    
        let track = await Track.findById(req.params.id)
    
        track.user = req.user._id;
        track.published = 'true'
        try{
            await track.save();
            res.send(track);
        }catch(e) {
            res.status(400).send(e);
        }
    });
    router.delete('/:id', [auth, permit('admin')], async (req, res) => {      
        try{
            let track = await Track.findByIdAndDelete(req.params.id)
            res.send(track);
        }catch(e) {
            res.status(404).send(e);
        }
    });
    return router;
}
module.exports = createRouter;
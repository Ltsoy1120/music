const express = require('express');
const router = express.Router();
const auth = require('../app/middleware/auth')
const TrackHistory = require('./models/TrackHistory');


const createRouter = () => {
    router.post('/', auth, async (req,res) => {
        const user = req.user
        try{
            const track_history = new TrackHistory(req.body);
            track_history.user = user._id;
            const newDate = new Date()
            track_history.datetime = newDate.toUTCString();
            await track_history.save();
            res.send (track_history);
        }catch (e) { 
            res.status(400).send(e);
        }
    });
    router.get('/', auth, async (req, res) => {
        const user = req.user
       
        try{
            const track_history = await TrackHistory.find({user: user._id}).populate('track', 'title album').sort({datetime: -1}); 
            
            res.send(track_history);
        }catch(e){
            res.status(500).send(e);
        }
    });
    return router;
}

module.exports = createRouter;
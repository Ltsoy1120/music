const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('./config.js');
const auth = require('./middleware/auth.js');
const permit = require('./middleware/permit.js');

const Artist = require('./models/Artist');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename:(req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

const createRouter = () => {
    router.get('/', async (req, res) => {  
        try{
            const artists = await Artist.find()
            res.send(artists);
        }catch (e) {
            res.sendStatus(500);
        }                                
    });
    router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
    
        let artist = await Artist.findById(req.params.id)
    
        artist.user = req.user._id;
        artist.published = 'true'
        try{
            await artist.save();
            res.send(artist);
        }catch(e) {
            res.status(400).send(e);
        }
    });
    router.delete('/:id', [auth, permit('admin')], async (req, res) => {      
        try{
            let artist = await Artist.findByIdAndDelete(req.params.id)
            res.send(artist);
        }catch(e) {
            res.status(404).send(e);
        }
    });
    router.post('/', [auth, permit('admin', 'user'), upload.single('image')], async (req, res) => {        
        const artist = new Artist(req.body);
        if(req.file){
            artist.image = req.file.filename;
        }
        artist.user = req.user._id;

        try{
            await artist.save();
            res.send(artist);
        }catch(e) {
            res.status(400).send(e);
        }
    });

    return router;
}
module.exports = createRouter;
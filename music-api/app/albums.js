const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('./config.js');
const auth = require('./middleware/auth.js');
const permit = require('./middleware/permit.js');

const Album = require('./models/Album');
const Track = require('./models/Track');

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
        let filter = {};
        if(req.query.artist){
            filter.artist = req.query.artist;
        }
        try{
            const albums = await Album.find(filter).populate('artist', 'title information').sort({yearOfIssue: 1});
           
            let albumsWithTracks = []
            for (let i=0; i<albums.length; i++) {
                const tracks = await Track.find({album: albums[i]._id});
                albumsWithTracks.push({
                    _id: albums[i]._id,
                    title: albums[i].title,
                    artist: albums[i].artist,
                    yearOfIssue: albums[i].yearOfIssue,
                    coverImage: albums[i].coverImage,
                    tracksCount: tracks.length,
                    published: albums[i].published,
                    user: albums[i].user
                })
            }
            res.send(albumsWithTracks);
        } catch (e) {
            res.status(500).send(e);
        }
    });
    router.get('/:id', async (req, res) => {
        try{
            let result = await Album.findById(req.params.id).populate('artist', 'title information');
            const tracks = await Track.find(req.params.id);
            result.tracks = tracks.length;
            if(result){
                res.send(result);
            } else {
                res.sendStatus(404); 
            }        
        } catch (e) {
            res.status(500).send(e);
        }
    });
    router.post('/', auth, [auth, permit('admin', 'user'), upload.single('coverImage')], async (req,res) => {
        const albumData = req.body;
        const album = new Album(albumData);
        if(req.file){
            album.coverImage = req.file.filename;
        }
        album.user = req.user._id;
        try{
            await album.save();
            res.send(album);
        }catch (e){
            res.status(400).send(e);
        }
    });
    router.post('/:id/publish', [auth, permit('admin')], async (req, res) => {
    
        let album = await Album.findById(req.params.id)
    
        album.user = req.user._id;
        album.published = 'true'
        try{
            await album.save();
            res.send(album);
        }catch(e) {
            res.status(400).send(e);
        }
    });
    router.delete('/:id', [auth, permit('admin')], async (req, res) => {      
        try{
            let album = await Album.findByIdAndDelete(req.params.id)
            res.send(album);
        }catch(e) {
            res.status(404).send(e);
        }
    });
    return router;
}
module.exports = createRouter;
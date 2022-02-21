const express = require('express');
const config = require('./config');
const auth = require('./middleware/auth');
const router = express.Router();
const axios = require('axios')

const User = require('./models/User');
const { nanoid } = require('nanoid');
const multer = require('multer');

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
    // router.get('/', async (req, res) => {
    //     try{
    //             const users = await User.find()
    //             res.send (users);
    //         }catch (e) {
    //             res.status(500).send(e);
    //         }          
    // });
    router.post('/',upload.single('image'), async (req, res) => {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName
        });
        if(req.file){
            user.avatarImage = req.file.filename;
        }
        try{
            user.generationToken();
            await user.save();
            res.send(user);
        }catch(e) {
            res.status(400).send(e);
        }
    });
    router.post('/facebookLogin',async (req,res) => {
        const inputToken = req.body.accessToken
        const accessToken = `${config.facebook.appId}|${config.facebook.secret}`
        const tokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`
               
        try{
            const response = await axios.get(tokenUrl)

            if(response.data.error){
                return res.status(401).send({message: 'Facebook token error'})
            }
            if(response.data.data.user_id !== req.body.userID){
                return res.status(401).send({message:'Wrong User ID'})
            }
            let user = await User.findOne({facebookId: req.body.id})
            
            if(!user) {
                user = new User({
                    username: req.body.email,
                    password: nanoid(),
                    displayName: req.body.name,
                    avatarImage: req.body.picture.data.url,
                    facebookId: req.body.id
                })
                user.generationToken()
                await user.save()
            }
            user.generationToken()
            await user.save({validateBeforeSave:false})
            return res.send({message: 'Login or reister successful', user})
        }catch(e){
            return res.status(401).send({message: 'Facebook token error', e})
        }
    })
    router.post('/sessions', async (req,res) => {
        const user = await User.findOne({username: req.body.username});
        if(!user) {
            return res.status(400).send({error: 'Username not found'});
        }
        const isMatch = await user.checkPassword(req.body.password);
        if(!isMatch) {
            return res.status(400).send({error: 'Password is wrong!'});
        }
        user.generationToken();
        await user.save({validateBeforeSave:false});
        
        res.send({message: 'Username and password correct!', user});
    })
    router.delete('/sessions', auth, async(req, res) => {
        const user = req.user
        const success = {message:'Success'}
        user.token = ''
        await user.save({validateBeforeSave:false})
        return res.send(success)
    })
    return router;
}
module.exports = createRouter;
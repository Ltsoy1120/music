const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const SALT_WORK_fACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: async value => {
                const user = await User.findOne({username: value})
                if(user) return false
            },
            message: 'This user is already registered'
        }
    },
    password: {
        type: String,
        required:true,
    },
    role: {
        type: String,
        required:true,
        default: 'user',
        enum: ['user', 'admin']
    },
    token: {
        type: String,
        required: true
    },
    facebookId: {
        type: Number,
        minlength: 10
    }, 
    displayName: {
        type: String,
        required: true
    },
    avatarImage: String
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_fACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});
UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};
UserSchema.methods.generationToken = function() {
    return this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
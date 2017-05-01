const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
const bcrypt = require('bcryptjs');

const config = require('../config/database');

const UserSchema = mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,

    },
    username: {
        type: String

    },
    password: {
        type: String,

    },
    market: {
        type: String,
        default: null

    },

    location: {
        type: String,
        default: null
    },
    friend: {
        type: Array,
        default: null
    },
    company: {
        type: Array,
        default: null
    },
    college: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: null
    },
    skills: {
        type: String,
        default: null
    },
    resume: {
        type: String,
        default: null
    },
    accomplish: {
        type: String,
        default: null
    }


});
const User = module.exports = mongoose.model('datas', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);

}
module.exports.getUserByUsername = function(username, callback) {
    const query = { username: username };
    User.findOne(query, callback);

}
module.exports.getUserByEmail = function(email, callback) {
    const query = { email: email };
    User.findOne(query, callback);

}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}


module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {

        if (err) throw err;
        callback(null, isMatch);
    });
}
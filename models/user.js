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
        type: String

    },

    location: {
        type: String
    },
    friend: {
        type: Array
    },
    company: {
        type: Array
    },
    college: {
        type: String
    },
    address: {
        type: String
    },
    gender: {
        type: String
    },
    role: {
        type: String
    },
    skills: {
        type: String
    },
    resume: {
        type: String
    },
    accomplish: {
        type: String
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
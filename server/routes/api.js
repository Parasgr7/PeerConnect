const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const assert = require('assert');
const User = require('../../models/user');
const config = require('../../config/database');



router.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
// declare axios for making http requests
const axios = require('axios');


router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register' });
        } else {
            res.json({ success: true, msg: 'Succesfully registered' });
        }

    });


});
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.upassword;
    User.getUserByUsername(username, (err, user) => {

        if (err) throw err;

        if (!user) {
            return res.json({ success: false, msg: 'User not found' });

        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }


        });

    });


});


router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user });
});


module.exports = router;
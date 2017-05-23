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

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'parasgr484@gmail.com',
        pass: 'evegaur40@'
    }
});

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        market: req.body.market,
        location: req.body.location

    });
    User.addUser(newUser, (err, user) => {
        console.log(err);
        if (err) {
            res.json({ success: false, msg: 'Failed to register' });
        } else {

            res.json({ success: true, msg: 'Succesfully registered' });

            let mailOptions = {
                from: '"peerConnect" <parasgr484@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: 'Succesfull Signup', // Subject line 
                html: '<b>Welcome to the world of peerConnect.Thanks for signup.We appreciate your effort and valuable time</b>.<a href="http://localhost:4200/login">Login</a>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });


        }

    });



});
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.upassword;
    User.getUserByEmail(email, (err, user) => {

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


router.get('/profile/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.getUserById(req.params.id, (err, user) => {

        if (user._id) {


            User.findOne({ '_id': req.params.id }, function(err, obj) { res.send(obj) });

        } else {
            res.json({ success: false });

        }
    });
});

router.get('/friends', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    var result = [];
    User.find(function(err, data) {

        data.forEach(function(user) {
            result.push(user);
        });

        res.send(result);
    });
});

router.get('/fetchFriend/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    User.getUserById(req.params.id, (err, user) => {

        if (user._id) {

            User.findOne({ '_id': req.params.id }, function(err, obj) { res.send(obj) });


        } else {
            res.json({ success: false });

        }
    });
});
router.get('/fetchCompany/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    User.getUserById(req.params.id, (err, user) => {

        if (user._id) {

            User.findOne({ '_id': req.params.id }, function(err, obj) { res.send(obj) });


        } else {
            res.json({ success: false });

        }
    });
});

router.put('/setFriend/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.getUserById(req.params.id, (err, user) => {

        if (user._id) {
            User.findByIdAndUpdate(req.params.id, { $push: { friend: req.body } }, { safe: true, upsert: true, new: true },
                function(err, model) {});
        } else {
            res.json({ msg: 'NOT Done' });

        }
    });
});
router.put('/setCompany/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.getUserById(req.params.id, (err, user) => {

        if (user._id) {
            User.findByIdAndUpdate(req.params.id, { $push: { company: req.body } }, { safe: true, upsert: true, new: true },
                function(err, model) {});
        } else {
            res.json({ msg: 'NOT Done' });

        }
    });
});


router.post('/refIndividual', passport.authenticate('jwt', { session: false }), (req, res) => {


    let mailOptions = {
        from: '"peerConnect" <parasgr484@gmail.com>', // sender address
        to: req.body.mail1, // list of receivers
        subject: 'Reference through peerConnect', // Subject line 
        html: '<b>You have been refered to</b>' + req.body.user + 'by Company ' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

});
router.post('/refCompany', passport.authenticate('jwt', { session: false }), (req, res) => {

    let mailOptions = {
        from: '"peerConnect" <parasgr484@gmail.com>', // sender address
        to: req.body.mail1, // list of receivers
        subject: 'Reference through peerConnect', // Subject line 
        html: '<b>You have been refered by</b>' + req.body.user + '<b>to Company</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

});


router.put('/complete/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    User.getUserById(req.params.id, (err, user) => {

        if (user._id) {
            User.findOneAndUpdate({ _id: req.params.id }, {
                    $set: {
                        college: req.body.college,
                        address: req.body.address,
                        gender: req.body.gender,
                        role: req.body.role,
                        skills: req.body.skills,
                        resume: req.body.resume,
                        accomplish: req.body.accomplish
                    }
                }, { safe: true, upsert: true, new: true },
                function(err, model) {});
        } else {
            res.json({ msg: 'NOT Done' });

        }
    });
});


router.put('/complete1/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    User.getUserById(req.params.id, (err, user) => {

        if (user._id) {
            User.findOneAndUpdate({ _id: req.params.id }, {
                    $set: {
                        jobs: req.body.jobs,
                        website: req.body.website,
                        size: req.body.size,
                        product: req.body.product,
                        whyus: req.body.whyus
                    }
                }, { safe: true, upsert: true, new: true },
                function(err, model) {});

        } else {
            res.json({ msg: 'NOT Done' });

        }
    });
});


router.put('/image/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.getUserById(req.params.id, (err, user) => {

        if (user._id) {
            User.findOneAndUpdate({ _id: req.params.id }, {
                    $set: {
                        image: req.body.dp

                    }
                }, { safe: true, upsert: true, new: true },
                function(err, model) {});
        } else {
            res.json({ msg: 'NOT Done' });

        }
    });
});
router.post('/followFriend/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.getUserById(req.params.id, (err, user) => {

        if (user._id) {
            User.find({ friend: { $elemMatch: { _id: req.body.id } } });

        } else {
            res.json({ msg: 'NOT Done' });

        }
    });
});

router.post('/followCompany/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.getUserById(req.params.id, (err, user) => {

        if (user._id) {
            User.find({ company: { $elemMatch: { _id: req.body.id } } });


        } else {
            res.json({ msg: 'NOT Done' });

        }
    });
});

router.get('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.params.id);
    User.getUserById(req.params.id, (err, user) => {

        if (user._id) {
            User.remove({ _id: req.params.id }, function(err, callback) {

                console.log('Done');
            });

        } else {
            res.json({ success: false });

        }
    });
});

module.exports = router;
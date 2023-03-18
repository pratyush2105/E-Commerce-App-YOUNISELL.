//Setting up Express Route
//Node.js MongoDB Authentication
const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

//A JWT is assigned to every user after login, so that when they make any request(like cart), it checks if it(cart) belongs to them or not. 
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });

    //sends newUser data to our DB
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//SIGNIN
router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );
        !user && res.status(401).json('Wrong Credentials!');

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        OriginalPassword !== req.body.password && res.status(401).json('Wrong Credentials!');

        //if everything is ok after login process we create JWT for the user
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: '3d' }//expires in 3 days
        );

        const { password, ...others } = user._doc;//we pass only other info rather than password
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
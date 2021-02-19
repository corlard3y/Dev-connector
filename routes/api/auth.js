const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const { check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

//@route GET api/auth  
// test route
//public
router.get('/', auth , async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route POST api/auth
// Authenticate user and get token
//public
router.post('/', [
    check('email', 'Please, include a valid email').isEmail(),
    check('password', 'Password is required!!!').exists()
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
    //see if user exists
    let user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });

    }

    //return jwt
    const payload ={
        user: {
            id:user.id
        }
    }

    jwt.sign(payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        }
        )

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error'); 
    }
    console.log(req.body);
    });


module.exports = router;
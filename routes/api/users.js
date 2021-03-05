const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult} = require('express-validator');



const User = require('../../models/user');

//@route POST api/users
// Register user 
//public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please, include a valid email').isEmail(),
    check('password', 'Please enter a password of 6 characters or more!!!').isLength({ min: 6 })
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
    //see if user exists
    let user = await User.findOne({ email });

    if(user){
        return res.status(400).json({ errors: [{msg: 'User already exists'}] });
    }

    //get user gravatar
    const avatar = gravatar.url(email ,{
        s:'200',
        r:'pg',
        d:'mm'
    })

    user = new User({
        name,
        password,
        email,
        avatar
    })
    //encrypt password

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
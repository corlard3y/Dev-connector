const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const { check, validationResult} = require('express-validator');
const User = require('../../models/user');
const Post = require('../../models/post');
const request = require('request');
const config = require('config');

//@route GET api/profile/me
// Get Current Users  profile
//private
router.get('/me', auth, async(req, res) => {
      try {
          const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name','avatar']);
          
          if (!profile){
              return res.status(400).json({ msg:'There is no Profile for this user'});
          }

          res.json(profile);
      } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }
});


//@route POST api/profile
//Create or update user profile
//private
router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty()
]], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    //Build profile object

    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio= bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername= githubusername;
    //split an array
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //Build social object
    profileFields.social= {}
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter= twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.instagram = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    try {

        let profile = await Profile.findOne({user: req.user.id});

        if(profile){
            //update

            profile = await Profile.findOneAndUpdate(
                {user: req.user.id}, 
                { $set: profileFields}, 
                { new: true}
                );

                return res.json(profile);
        }

        //create 
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }

});

//@route GET api/profile
//get all profiles
//public
router.get('/', async (req , res) => {
        try {

            const profiles = await Profile.find().populate('user', ['name', 'avatar']);
            res.json(profiles);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error'); 
        }
});

//@route GET api/profile/user/user_id
//get profile by id
//public
router.get('/user/:user_id', async (req , res) => {
    try {

        const profile = await Profile.findOne({ user: req.params.user_id}).populate('user', ['name', 'avatar']);
        res.json(profile);

        if(!profile) res.status(400).json({ msg: 'Profile not found'});
    } catch (err) {
        console.error(err.message);
        if( err.kind == 'ObjectId'){
        return res.status(400).json({ msg: 'Profile not found'});
        }
        res.status(500).send('Server error'); 
    }
});


//@route DELETE api/profile
//delete profile ,user and posts
//private
router.delete('/',auth , async (req , res) => {
    try {

        //remove user post
        await Post.deleteMany({ user: req.user.id });

        //remove profile
        await Profile.findOneAndRemove({ user: req.user.id});
        //remove user
        await User.findOneAndRemove({ _id: req.user.id});

        res.json({msg:'User deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error'); 
    }
});

//@route PUT api/profile/experiece
//add profile experience
//private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(),
]], async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user : req.user.id});

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route DELETE api/profile/experience/:exp_id
//delete experience from profile
//private

router.delete('/experience/:exp_id', auth , async ( req, res) => {
 try {
    const profile = await Profile.findOne({ user : req.user.id});
   
    //get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
 
    res.json(profile);

 } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
 }
});


//@route PUT api/profile/education
//add profile education
//private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(),

]], async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user : req.user.id});

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route DELETE api/profile/education/:edu_id
//delete education from profile
//private

router.delete('/education/:edu_id', auth , async ( req, res) => {
 try {
    const profile = await Profile.findOne({ user : req.user.id});
   
    //get remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();
 
    res.json(profile);

 } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
 }
});

//@route GET api/profile/github/:username
//get user repos from github
//public

router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&cliecnt_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}
             
        };

        request(options, (error, response, body) => {
            if(error) console.error(error);

            if(response.statusCode !== 200){
               return res.status(404).json({ msg: 'No Github Profile found'});
            }

            res.json(JSON.parse(body));
        });


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
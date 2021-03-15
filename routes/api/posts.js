const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/post');
const Profile = require('../../models/profile');
const User = require('../../models/user');



//@route POST api/posts
// create post
//private
router.post('/', [auth, [
    check('text', 'Text is required!!!').not().isEmpty()
]] ,async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
    
        const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
         
    });
    const post = await newPost.save();
    
    res.json(post);


    } catch (err) {
        console.error(err.message); 
        res.status(500).send('Server error');

    }

    
});

//@route GET api/posts
// get all posts
//private

router.get('/', auth, async (req, res) =>{
    try {
       const posts = await Post.find().sort({ date: -1});
       res.json(posts); 
    } catch (err) {
        console.error(err.message); 
        res.status(500).send('Server error');
    }
});

//@route POST api/posts/:id
// get post by ID
//private

router.get('/:id', auth, async (req, res) =>{
    try {
       const posts  = await Post.findById(req.params.id);
        if(!posts){
            res.status(404).json({ msg: 'Post not found'});
        }

       res.json(posts); 
    } catch (err) {
        console.error(err.message); 
        if(err.kind ===  'ObjectId'){
            res.status(404).json({ msg: 'Post not found'});
        }
        res.status(500).send('Server error');
    }
});

//@route DELETE api/post/:id
// delete a post
//private

router.delete('/:id', auth, async (req, res) =>{
    try {
       const post = await Post.findById(req.params.id);

       if(!post){
        res.status(404).json({ msg: 'Post not found'});
    }
       //check on user
       if(post.user.toString() !== req.user.id){
           return res.status(401).json({ msg: 'User not authorized'});
       }

       await post.remove();

       res.json({ msg : 'Post removed' }); 
    } catch (err) {
        console.error(err.message);
        if(err.kind ===  'ObjectId'){
            res.status(404).json({ msg: 'Post not found'});
        } 
        res.status(500).send('Server error');
    }
});

//@route PUT api/post/like/:id
// like a post
//private

router.put('/like/:id',auth, async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);


        //check if the post has already ben liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg: 'post already liked'});
        }

        post.likes.unshift({ user: req.user.id});

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message); 
        res.status(500).send('Server error');
    }
});

//@route PUT api/post/unlike/:id
// unlike a post
//private

router.put('/unlike/:id',auth, async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);


        //check if the post has already ben liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ msg: 'post has not yet been liked'});
        }

        //get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id); 

        post.likes.splice(removeIndex, 1); 

        await post.save();

        res.json(post.likes);
    } catch (err) { 
        console.error(err.message); 
        res.status(500).send('Server error');
    }
});

//@route POST api/posts/comment/:id
// comment on a post
//private
router.post('/comment/:id', [auth, [
    check('text', 'Text is required!!!').not().isEmpty()
]] ,async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        
        const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
          
    }; 

    post.comments.unshift(newComment);
     await post.save();
    
    res.json(post.comments);


    } catch (err) {
        console.error(err.message); 
        res.status(500).send('Server error');

    }

    
});

//@route DELETE api/posts/comment/:id/comment_id
// delete post
//private
router.delete('/comment/:id/:comment_id', auth, async ( req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //check if comment exists
        if(!comment){
            return res.status(404).json({ msg: ' Comment does not exist' });
        }
        //check user
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({ msg:'User not authorized' });
        }

     //get remove comments
     const removeIndex = post.comments.map(comment=> comment.user.toString()).indexOf(req.user.id); 

     post.comments.splice(removeIndex, 1); 

     await post.save();

     res.json(post.comments);   
        
    } catch (err) { 
        console.error(err.message); 
        res.status(500).send('Server error');
    }
});

 
module.exports = router;
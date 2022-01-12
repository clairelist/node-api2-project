// DATA SECTIONR
const express = require('express');
const Post = require('./posts-model.js');
const router = express.Router();

// LOGIC SECTIONR

//// GET ALL POSTS
router.get('/', (req,res) => {
    Post.find(req.query)
    .then(posts=>{
     res.status(200).json(posts);
    }).catch(err=>{
        console.error(err);
        res.status(500).json({error:`The posts information could not be retrieved`})
    })
});

//// GET SINGULAR POST -- by id
router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
    .then(post=>{
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist'});
        }
    }).catch(err=>{
        console.error(err);
        res.status(500).json({message: 'The information could not be retrived'});
    })
});

//// POST POST PASSES THE CORRECT INFO IN THE REQ BODY AND THEN RETURNS THE RIGHT OBJECT
router.post('/', (req,res) => {
    const {title,contents} = req.body;
    //this data must come before we create the object !
   
    if (!title || !contents) {
        res.status(400).json({message: 'Please provide title and contents for the post'});
    } else {
        Post.insert({title,contents})
        .then(({id})=>{ 
            return Post.findById(id); //we nest this here because the returned object of post with this id is expected
        })
        .then(post=>{
            res.status(201).json(post); ///...and now HERE we actually post it to the server lol
        }).catch(err=>{
            console.error(err);
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
    }
});

router.put('/:id', (req,res) => {
    const {title,contents} = req.body;
    //this data must come before we create the object !
   
    if (!title || !contents) {
        res.status(400).json({message: 'Please provide title and contents for the post'});
    } else {
        Post.findById(req.params.id)
        .then(post=>{
            if (!post) {
             res.status(404).json({message: 'The post with the specified ID does not exist'});
            } else {
               return Post.update(req.params.id,req.body)
            }
        }).then(info=>{
            if (info) {
                return Post.findById(req.params.id);
            } 
        }).then(post=>{
            res.status(200).json(post);
        }).catch(err=>{
            res.status(500).json({ message: "The post information could not be modified", error:err });
        })
    }
});
// ...basically I had it a bit backwards, LOL !

router.delete('/:id', async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({message: 'The post with the specified ID does not exist'});
        } else {
            await Post.remove(req.params.id);
            res.json(post);
        }
    } catch (err) {
        res.status(500).json({message: 'The post could not be removed', error:err});
    }
}); //try - catch block method here, for kicks !

//RETURN -- PSUED EXPORT SECTIONR
module.exports = router;
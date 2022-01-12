// DATA SECTIONR
const express = require('express');
const Post = require('./posts-model.js');
const router = express.Router();

// LOGIC SECTIONR

//// GET ALL POSTS
router.get('/',(req,res)=>{
    Post.find(req.query)
    .then(posts=>{
     res.status(200).json(posts);
    }).catch(err=>{
        console.error(err);
        res.status(500).json({error:`The posts information could not be retrieved`})
    })
});

//// GET SINGULAR POST -- by id
router.get('/:id'),(req,res)=>{
    Post.findById(req.params.id)
    .then(post=>{
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'The post with the specified ID does not exist'});
        }
    }).catch(err=>{
        console.error(err);
        res.status(500).json({message: 'The information could not be retrived'});
    })
}
//TODO WHEN I GET HOME:: TEST THESE ENDPOINTS ARE WORKING !

//RETURN -- PSUED EXPORT SECTIONR
module.exports = router;
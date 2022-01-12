// DATA SECTIONR
const express = require('express');
const Post = require('./posts-model.js');
const router = express.Router();

// LOGIC SECTIONR
router.get('/',(req,res)=>{
    Post.find(req.query)
    .then(posts=>{
     res.status(200).json(posts);
    }).catch(err=>{
        console.error(err);
        res.status(500).json({error:`The posts information could not be retrieved`})
    })
});

//RETURN -- PSUED EXPORT SECTIONR
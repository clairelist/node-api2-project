// DATA SECTION
const express = require('express');
const postsRouter = require('./posts/posts-router');
const server = express();

//LOGIC SECTION
server.use(express.json());
server.use('/api/posts',postsRouter); //MUST USE RIGHT PATH ! THIS IS NOT A MODULE PATH CLAIRE THIS IS A ~ROUTE~ !!!


//RETURN (PSUED EXPORT) SECTIONR
module.exports = server;
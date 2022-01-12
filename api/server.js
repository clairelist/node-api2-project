// DATA SECTION
const express = require('express');
const postsRouter = require('./posts/posts-router');
const server = express();

//LOGIC SECTION
server.use(express.json());
server.use('./posts/posts-router',postsRouter);

//RETURN (PSUED EXPORT) SECTIONR
module.exports = server;
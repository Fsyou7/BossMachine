const express = require('express');
const apiRouter = express.Router();

console.log('apiRouter is functioning');

const minions = require('./minions.js');

apiRouter.use('/minions', minions);


module.exports = apiRouter;

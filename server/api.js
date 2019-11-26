const express = require('express');
const apiRouter = express.Router();



const minions = require('./minions.js');

apiRouter.use('/api/minions', minions);

module.exports = apiRouter;

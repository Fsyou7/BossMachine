const express = require('express');
const apiRouter = express.Router();

console.log('apiRouter is functioning');

const minions = require('./minions.js');
const ideas = require('./ideas.js');

apiRouter.use('/minions', minions);
apiRouter.use('/ideas', ideas);

module.exports = apiRouter;

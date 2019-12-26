const express = require('express');
const apiRouter = express.Router();

console.log('apiRouter is functioning');

const minions = require('./minions.js');
const ideas = require('./ideas.js');
const meetings = require('./meetings.js');

apiRouter.use('/minions', minions);
apiRouter.use('/ideas', ideas);
apiRouter.use('/meetings', meetings);

module.exports = apiRouter;

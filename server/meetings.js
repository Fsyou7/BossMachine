const express = require('express');
const meetingsRouter = express.Router();

console.log('meetingsRouter is functioning');
const db = require('./db.js');
const Module = require('./module.js');




module.exports = meetingsRouter;
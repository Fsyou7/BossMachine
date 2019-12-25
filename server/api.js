const express = require('express');
const apiRouter = express.Router();

console.log('apiRouter is functioning');

const minions = require('./minions.js');
const ideas = require('./ideas.js');


//Get a copy of all of the models of a particular type in the database.  Takes a string of the model name

// apiRouter.use(['/minions', '/ideas', '/meetings'], (req, res, next) => {
//     console.log(`getAllModels is functioning`);
//     //console.log(req.method);

//     const getAllModels = (model) => {
//         let allModels = [];
//         allModels = db.getAllFromDatabase(model);
//         return allModels;
//         console.log(`allModels: ${allModels}`);
//     };
// // })



apiRouter.use('/minions', minions);
apiRouter.use('/ideas', ideas);

module.exports = apiRouter;

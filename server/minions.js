const express = require('express');
const minionsRouter = express.Router();

console.log('minionsRouter is functioning');
const db = require('./db.js');
const Module = require('./module.js');
console.log(Module);

//Turn the minionId into a number and add it to the request
minionsRouter.use('/:minionId', (req, res, next) => {
    const id = req.params;
    const minionIdNumber = Number(id.minionId);
    req.minionIdNumber = minionIdNumber;
    next();
});

//Verify that the minion is in the database
// const verifyMinion = (minionIdNumber) => {
//     let allMinions = Module.getAllModels('minions');
//     let isIncluded = false;
//     allMinions.forEach((minionObject) => {
//         let minionObjectId = minionObject.id;
//         if (minionObjectId == minionIdNumber){
//             isIncluded = true;
//         }
//     });
//     return isIncluded;
// }

minionsRouter.get('/', (req, res, next) => {;
    let allMinions = Module.getAllModels('minions');
    res.status(200).send(allMinions);
    next();
});

minionsRouter.get('/:minionId', (req, res, next) => {
    const id = req.params;
    const minionIdNumber = req.minionIdNumber;
   
    const minionIsIncluded = Module.verifyModel('minions', minionIdNumber);
    
    if (isNaN(minionIdNumber) || !minionIsIncluded ){
        //console.log('if not status 200')
        res.status(404);
    } else{
        const getMinion = db.getFromDatabaseById('minions', id.minionId);
        res.status(200).send(getMinion);
    }
    next();
});

minionsRouter.post('/', (req, res, next) => {
    const createMinion = {};
    createMinion.id = this.id;
    createMinion.name = req.body.name;
    createMinion.title = req.body.title;
    createMinion.salary = req.body.salary;
    res.status(201).send(db.addToDatabase('minions', createMinion));
    next();
})

minionsRouter.put('/:minionId', (req, res, next) => {
    const id = req.params;
    const minionIdNumber = req.minionIdNumber;
   
    const minionIsIncluded = Module.verifyModel('minions', minionIdNumber);
    let minionToChange = db.getFromDatabaseById('minions', minionIdNumber);
    const changedMinion = req.body;

    if (isNaN(minionIdNumber) || !minionIsIncluded ){
        res.status(404);
    } else{
        const returnedMinion = db.updateInstanceInDatabase('minions', changedMinion);
    res.status(200).send(returnedMinion);
    }
    next();
});

minionsRouter.delete('/:id', (req, res, next) => {
    const id = req.params;
    const minionIdNumber = req.minionIdNumber;
    const minionId = req.params.id;

    const minionIsIncluded = Module.verifyModel('minions', minionIdNumber);
    if(isNaN(minionIdNumber) || !minionIsIncluded){
        res.status(404).send(false);
    } else {
        db.deleteFromDatabasebyId('minions', minionId);
        res.status(204).send(true);
    }
    next();
});

module.exports = minionsRouter;
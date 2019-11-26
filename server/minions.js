const express = require('express');
const minionsRouter = express.Router();

console.log('Minions Router is functioning');
const db = require('./db.js');
//console.log(db);

minionsRouter.get('/', (req, res, next) => {
    //console.log('GET route functioning');
    let allMinions = [];
    allMinions = db.getAllFromDatabase('minions');
    //console.log(allMinions);
    //return allMinions;
    res.status(200).send(allMinions);
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

minionsRouter.get('/:minionId', (req, res, next) => {
    const id = req.params;
    const minionIdNumber = Number(id.minionId);
    const minionIdType = typeof minionIdNumber;
    let allMinions = db.getAllFromDatabase('minions');
    let isIncluded = false;
    let includedId = allMinions.forEach((minionObject) => {
        let minionObjectId = Number(minionObject.id);
        if (minionObjectId == minionIdNumber){
            isIncluded = true;
        }
    });
    console.log(`isIncluded ${isIncluded}`);
    if (isNaN(minionIdNumber) || !isIncluded ){
        res.status(404);
        console.log('Not Found');
    } else{
        const getMinion = db.getFromDatabaseById('minions', id.minionId);
        res.status(200).send(getMinion);
    }
    next();
});
module.exports = minionsRouter;

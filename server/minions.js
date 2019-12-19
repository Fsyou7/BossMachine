const express = require('express');
const minionsRouter = express.Router();

console.log('minionsRouter is functioning');
const db = require('./db.js');

//Turn the minionId into a number and add it to the request
minionsRouter.use('/:minionId', (req, res, next) => {
    const id = req.params;
    const minionIdNumber = Number(id.minionId);
    req.minionIdNumber = minionIdNumber;
    next();
});

//Get a copy of the minions in the database
const getAllMinions = () => {
    let allMinions = [];
    allMinions = db.getAllFromDatabase('minions');
    return allMinions;
};

//Verify that the minion is in the database
const verifyMinion = (minionIdNumber) => {
    let allMinions = getAllMinions();
    let isIncluded = false;
    allMinions.forEach((minionObject) => {
        let minionObjectId = minionObject.id;
        if (minionObjectId == minionIdNumber){
            isIncluded = true;
        }
    });
    return isIncluded;
}

minionsRouter.get('/', (req, res, next) => {
    //console.log('GET route functioning');
    //console.log(getAllMinions());
    let allMinions = getAllMinions();
    res.status(200).send(allMinions);
    next();
});

minionsRouter.get('/:minionId', (req, res, next) => {
    const id = req.params;
    const minionIdNumber = req.minionIdNumber;
    if (isNaN(req.minionIdNumber) || !verifyMinion(minionIdNumber) ){
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
    const minionIdNumber = Number(req.params.minionId);
    console.log(minionIdNumber);
    //console.log(req.body);
    let minionToChange = db.getFromDatabaseById('minions', minionIdNumber);

    const changedMinion = req.body;

    if (isNaN(req.minionIdNumber) || !verifyMinion(minionIdNumber) ){
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
    if(isNaN(minionId) || !verifyMinion(minionIdNumber)){
        res.status(404).send(false);
    } else {
        db.deleteFromDatabasebyId('minions', minionId);
        res.status(204).send(true);
    }
    next();
});

module.exports = minionsRouter;
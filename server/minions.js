const express = require('express');
const minionsRouter = express.Router();

console.log('minionsRouter is functioning');
const db = require('./db.js');
//console.log(db);

minionsRouter.use('/:minionId', (req, res, next) => {
    //Turn the minionId into a number and add it to the request
    //console.log('middleware is functioning');
    const id = req.params;
    const minionIdNumber = Number(id.minionId);
    req.minionIdNumber = minionIdNumber;
    next();
});

const getAllMinions = (req, res, next) => {
    let allMinions = [];
    allMinions = db.getAllFromDatabase('minions');
    // req.getAllMinions = getAllMinions;
    return allMinions;
};

minionsRouter.get('/', (req, res, next) => {
    //console.log('GET route functioning');
    //console.log(getAllMinions());
    let allMinions = getAllMinions();
    res.status(200).send(allMinions);
    next();
});

minionsRouter.get('/:minionId', (req, res, next) => {
    //console.log('/minion/:minionId is functioning');
    const id = req.params;
    //console.log(id);
    const minionIdNumber = req.minionIdNumber;
    
    //const minionIdType = typeof minionIdNumber;
    let allMinions = getAllMinions();
    let isIncluded = false;
    let includedId = allMinions.forEach((minionObject) => {
        let minionObjectId = minionObject.id;
        if (minionObjectId == req.minionIdNumber){
            isIncluded = true;
        }
    });

    if (isNaN(req.minionIdNumber) || !isIncluded ){
        
        res.status(404);
    } else{
        const getMinion = db.getFromDatabaseById('minions', id.minionId);
        res.status(200).send(getMinion);
    }
    
    next();
});

minionsRouter.post('/', (req, res, next) => {
    console.log('post route');
    const createMinion = {};
    createMinion.id = this.id;
    createMinion.name = req.body.name;
    createMinion.title = req.body.title;
    createMinion.salary = req.body.salary;
    res.status(201).send(db.addToDatabase('minions', createMinion));
    next();
})

minionsRouter.put('/:minionId', (req, res, next) => {
    console.log('put route is functioning');
    
    const minionId = req.params.minionId;
    //console.log(req.body);
    let minionToChange = db.getFromDatabaseById('minions', minionId);
    //console.log(minionToChange);
    // const changeMinion = (minionToChange) => {};
    const changedMinion = req.body;
    //console.log(changedMinion);
    const returnedMinion = db.updateInstanceInDatabase('minions', changedMinion);
    res.status(200).send(returnedMinion);

    const id = req.params;
    const minionIdNumber = Number(id.minionId);
    let allMinions = [];
    allMinions = db.getAllFromDatabase('minions');
    let includedId = allMinions.forEach((minionObject) => {
        let minionObjectId = Number(minionObject.id);
        if (minionObjectId == minionIdNumber){
            isIncluded = true;
        }
    });

    // if (isNaN(minionId) || )

    next();
});

module.exports = minionsRouter;

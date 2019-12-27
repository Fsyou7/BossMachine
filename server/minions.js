const express = require('express');
const minionsRouter = express.Router();

console.log('minionsRouter is functioning');
const db = require('./db.js');
const Module = require('./module.js');

//Turn the minionId into a number and add it to the request
minionsRouter.use('/:minionId', (req, res, next) => {
    const id = req.params;
    const minionIdNumber = Number(id.minionId);
    req.minionIdNumber = minionIdNumber;
    next();
});

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

const getMinionWork = (req, res, next) => {
    let minionId = req.params.minionId;
    let work = db.getAllFromDatabase('work');
    let workArray = [];
    let workIndex = 0;
    const minionIsIncluded = Module.verifyModel('minions', minionId);
    if (isNaN(minionId) || !minionIsIncluded){
        res.status(404).send();
    } else{
        let minionWork = work.forEach((workObject)=> {
            if(workObject.id == minionId){
                workArray[workIndex] = workObject;
                workIndex ++;
            }
        });
        //console.log(workArray);
        res.status(200).send(workArray);
    }  
    next();
}

const putMinionWork = (req, res, next) => {
    let workId = req.params.workId;
    let minionId = req.params.minionId;
    //console.log(req.params);
    //console.log(req.body);
    let updatedWork = req.body;
    const workIsIncluded = Module.verifyModel('work', workId);
    if (isNaN(workId) || !workIsIncluded){
        res.status(404).send();
    } else if (workId !== minionId ){
        res.status(400).send();
    }
    
    else {
        const returnedWork = db.updateInstanceInDatabase('work', updatedWork);
        res.status(200).send(returnedWork);
    }
    
};

const postMinionWork = (req, res, next) => {
    const createWork = {};
    createWork.id = req.body.id;
    createWork.title = req.body.title;
    createWork.description = req.body.description;
    createWork.hours = req.body.hours;
    createWork.minionId = req.body.minionId;
    res.status(201).send(db.addToDatabase('work', createWork));
    next();
};

const deleteMinionWork = (req, res, next) => {
    const workId = req.params.workId;
    const minionId = req.params.minionId;
    
    const workIsIncluded = Module.verifyModel('work', workId);
    const minionIsIncluded = Module.verifyModel('work', workId);
    if(isNaN(workId) || !minionIsIncluded){
        res.status(404).send();
    } else {
        db.deleteFromDatabasebyId('work', workId);
        res.status(204).send();
    }
    next();
};

minionsRouter.get('/:minionId/work', getMinionWork);
minionsRouter.put('/:minionId/work/:workId', putMinionWork);
minionsRouter.post('/:minionId/work/', postMinionWork);
minionsRouter.delete('/:minionId/work/:workId', deleteMinionWork);


module.exports = minionsRouter;
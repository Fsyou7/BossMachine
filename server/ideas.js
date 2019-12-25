const express = require('express');
const ideasRouter = express.Router();

console.log('ideasRouter is functioning');
const db = require('./db.js');
const Module = require('./module.js');

//Turn the ideasId into a number and add it to the request
ideasRouter.use('/:ideasId', (req, res, next) => {
    const id = req.params;
    const ideaIdNumber = Number(id.ideasId);
    req.ideaIdNumber = ideaIdNumber;
    next();
});



ideasRouter.get('/', (req, res, next) => {
    let allIdeas = Module.getAllModels('ideas');
    res.status(200).send(allIdeas);
    next();
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    const id = req.params;
    const ideaIdNumber = req.ideaIdNumber;

    const ideaIsIncluded = Module.verifyModel('ideas', ideaIdNumber);
    
    if (isNaN(ideaIdNumber) || !ideaIsIncluded ){
        //console.log('if not status 200')
        res.status(404);
    } else{
        const getIdea = db.getFromDatabaseById('ideas', id.ideaId);
        res.status(200).send(getIdea);
    }
    next();
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const id = req.params;
    const ideaIdNumber = req.ideaIdNumber;
   
    const ideaIsIncluded = Module.verifyModel('ideas', ideaIdNumber);
    let ideaToChange = db.getFromDatabaseById('ideas', ideaIdNumber);
    const changedIdea = req.body;

    if (isNaN(ideaIdNumber) || !ideaIsIncluded ){
        res.status(404);
    } else{
        const returnedidea = db.updateInstanceInDatabase('ideas', changedIdea);
    res.status(200).send(returnedidea);
    }
    next();
});

ideasRouter.post('/', (req, res, next) => {
    const createIdea = {};
    createIdea.id = this.id;
    createIdea.name = req.body.name;
    createIdea.description = req.body.description;
    createIdea.numWeeks = req.body.numWeeks;
    createIdea.weeklyRevenue = req.body.weeklyRevenue;
    res.status(201).send(db.addToDatabase('ideas', createIdea));
    next();
})

ideasRouter.delete('/:id', (req, res, next) => {
    const id = req.params;
    const ideaIdNumber = req.ideaIdNumber;
    const ideaId = req.params.id;

    const ideaIsIncluded = Module.verifyModel('ideas', ideaIdNumber);
    if(isNaN(ideaIdNumber) || !ideaIsIncluded){
        res.status(404).send(false);
    } else {
        db.deleteFromDatabasebyId('ideas', ideaId);
        res.status(204).send(true);
    }
    next();
});

module.exports = ideasRouter;
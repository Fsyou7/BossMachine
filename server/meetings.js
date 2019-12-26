const express = require('express');
const meetingsRouter = express.Router();

console.log('meetingsRouter is functioning');
const db = require('./db.js');
const Module = require('./module.js');

meetingsRouter.get('/', (req, res, next) => {;
    let allMeetings = Module.getAllModels('meetings');
    res.status(200).send(allMeetings);
    next();
});

meetingsRouter.post('/', (req, res, next) => {
    //console.log(req);
    
    const generateMeeting = {};
    generateMeeting.time = req.body.time;
    generateMeeting.date = req.body.name;
    generateMeeting.day = req.body.day;
    generateMeeting.note = req.body.note;
    const meetingToAdd = db.createMeeting()
    res.status(201).send(db.addToDatabase('meetings', meetingToAdd));
    next();
})

meetingsRouter.delete('/', (req, res, next) => {
    res.status(204).send(db.deleteAllFromDatabase('meetings'));
})

module.exports = meetingsRouter;
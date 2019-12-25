const db = require('./db.js');

module.exports = {
    getAllModels: function (model){
        let allModels = [];
        allModels = db.getAllFromDatabase(model);
        return allModels;
    },

    verifyModel: function (model, modelIdNumber){
        let allModels = [];
        allModels = db.getAllFromDatabase(model);
        let isIncluded = false;

        allModels.forEach((modelObject) => {
            let modelObjectId = modelObject.id;
            if (modelObjectId == modelIdNumber){
                isIncluded = true;
            }
        });
    
        return isIncluded;
    },

    validateModel: function (id, success){
        const idNumber = req.idNumber;
        if (isNaN(req.idNumber) || !verifyMinion(idNumber) ){
            res.status(404);
        } else{
            const getMinion = db.getFromDatabaseById('minions', id.minionId);
            res.status(200).send(getMinion);
        }

    },

    addIdToRequest: function (id) {
        //Turn the modelId into a number and add it to the request
        const minionIdNumber = Number(id.minionId);
        req.minionIdNumber = minionIdNumber;
        next();
    }
}


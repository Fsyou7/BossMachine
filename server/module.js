const db = require('./db.js');

module.exports = {
    getAllModels: function (model){
        let allModels = [];
        allModels = db.getAllFromDatabase(model);
        //console.log(allModels);
        //console.log('getAllModels ran');
        return allModels;
    },

    verifyModel: function (model, modelIdNumber){
        let allModels = [];
        allModels = db.getAllFromDatabase(model);
        // console.log(`allModels: ${allModels}`);
        // console.log('verifyModel ran');
        let isIncluded = false;
        // console.log(allModels);
        allModels.forEach((modelObject) => {
            let modelObjectId = modelObject.id;
            if (modelObjectId == modelIdNumber){
                isIncluded = true;
            }
        });
        //console.log(`isIncluded: ${isIncluded}`)
        return isIncluded;
    },

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


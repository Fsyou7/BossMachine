const checkMillionDollarIdea = (req, res, next) => {
    let numWeeks = req.body.numWeeks;
    let weeklyRevenue = req.body.weeklyRevenue;
    let totalYield = numWeeks * weeklyRevenue;

    
    if(!numWeeks || !weeklyRevenue){
        res.status(400).send();
    } else if (!Number(numWeeks) || !Number(weeklyRevenue)){
        res.status(400).send();
    } else if (totalYield < 100000){
        res.status(400).send();
    } else {
        next();
    }
    
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

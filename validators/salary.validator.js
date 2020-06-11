const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const Salary = require('../models/salaries');

const ValidateDateInterval = {
    validate: async function (typeName, originalObject, materializeObject){
        if(materializeObject.from_date <= materializeObject.to_date){
            throw new ErrorDateInterval(typeName);
        }
    }
};

class ErrorDateInterval extends GNXError {
    constructor(typeName){
        super(
            typeName,
            'Invalid interval from_date must be smaller than to_date',
            'Cant create a new salary with the current dates'
        )
    }
}

module.exports = {
    ValidateDateInterval
};
const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const ValidateDeptManagerDateInterval = {
    validate: async function (typeName, originalObject, materializeObject){
        if(materializeObject.from_date <= materializeObject.to_date){
            throw new ErrorDeptManagerDateInterval(typeName);
        }
    }
};

class ErrorDeptManagerDateInterval extends GNXError {
    constructor(typeName){
        super(
            typeName,
            'Invalid interval from_date must be smaller than to_date',
            'Cant create a new dept_manager with the current dates'
        )
    }
}

module.exports = {
    ValidateDeptManagerDateInterval
}
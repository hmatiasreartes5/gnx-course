const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;


const ValidateTitleDateInterval = {
    validate: async function (typeName, originalObject, materializeObject){
        if(materializeObject.from_date <= materializeObject.to_date){
            throw new ErrorTitleDateInterval(typeName);
        }
    }
};

class ErrorTitleDateInterval extends GNXError {
    constructor(typeName){
        super(
            typeName,
            'Invalid interval from_date must be smaller than to_date',
            'Cant create a new title with the current dates'
        )
    }
}

module.exports = {
    ValidateTitleDateInterval
};
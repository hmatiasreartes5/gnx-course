const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const ValidateDeptEmployeeDateInterval = {
    validate: async function (typeName, originalObject, materializeObject){
        if(materializeObject.from_date <= materializeObject.to_date){
            throw new ErrorDeptEmployeeDateInterval(typeName);
        }
    }
};

class ErrorDeptEmployeeDateInterval extends GNXError {
    constructor(typeName){
        super(
            typeName,
            'Invalid interval from_date must be smaller than to_date',
            'Cant create a new dept_employee with the current dates'
        )
    }
}

module.exports = {
    ValidateDeptEmployeeDateInterval
}
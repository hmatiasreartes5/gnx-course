const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const Department = require('../models/departments');
const dept_manager = require('../models/dept_manager');
const dept_employee = require('../models/dept_employee');

const ValidateNameDepartment = {
    validate: async function(typeName,originalObject,materializeObject){
        const department = await Department.findOne({name: materializeObject.name});
        if(department){
            throw new CantRepeatNameError(typeName);
        }
    }
}

class CantRepeatNameError extends GNXError {
    constructor(typeName){
        super(
            typeName,
            'Name cant be repeated',
            'Cant create a new department with the current name'
        )
    }
}

const CantDeleteDepartmentWithDeptManager = {
    validate: async function(typeName,originalObject,materializeObject){
        const Dept_ManagerFinded = await dept_manager.findOne({'DepartmentID': originalObject})

        if(Dept_ManagerFinded){
            throw new CantDeleteDepartmentWithDeptManagerError(typeName);
        }
    }
}

class CantDeleteDepartmentWithDeptManagerError extends GNXError{
    constructor(typeName){
        super(
            typeName,
            'Department have at least 1 dept_manager related'
        )
    }
}

const CantDeleteDepartmentWithDeptEmployee = {
    validate: async function(typeName,originalObject,materializeObject){
        const Dept_employeeFinded = await dept_employee.findOne({'DepartmentID': originalObject})

        if(Dept_employeeFinded){
            throw new CantDeleteDepartmentWithDeptEmployeeError(typeName);
        }
    }
}

class CantDeleteDepartmentWithDeptEmployeeError extends GNXError{
    constructor(typeName){
        super(
            typeName,
            'Department have at least 1 dept_employee related'
        )
    }
}

module.exports = {
    ValidateNameDepartment,
    CantDeleteDepartmentWithDeptEmployee,
    CantDeleteDepartmentWithDeptManager
};
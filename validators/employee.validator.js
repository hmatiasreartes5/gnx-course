const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const Employee = require('../models/employees');
const Salary = require('../models/salaries');
const Title = require('../models/titles');
const dept_manager = require('../models/dept_manager');
const dept_employee = require('../models/dept_employee');

const ValidateDni = {
    validate: async function(typeName, originalObject,materializeObject){
        const employee = await Employee.findOne({dni: materializeObject.dni});

        if(employee){
            throw new DuplicateDniError(typeName);
        }
    }
};

class DuplicateDniError extends GNXError {
    constructor(typeName){
        super( 
            typeName,
            "DNI is already exist",
            'Cant create an employee with the current dni'
        )
    }
}

const ValidateAge = {
    validate: async function(typeName,originalObject,materializeObject){
        const employee = materializeObject
        let today = new Date();
        let birt_date = new Date(employee.birt_date);
        let age = today.getFullYear() - birt_date.getFullYear();
        let month = today.getMonth() - birt_date.getMonth();

        if(month < 0 || (m ==0 && today.getDate() < birt_date.getDate())){
            age--
        }

        if(age < 18) {
            throw new EmployeeAgeError(typeName);
        }
    }
}

class EmployeeAgeError extends GNXError {
    constructor(typeName){
        super(
            typeName,
            'Invalid Age, must be gerater than 18 years old',
            'Cant create an employees with age under 18 years'
        )
    }
}

const CantDeleteEmployeeWithSalary = {
    validate: async function(typeName,originalObject,materializeObject){
        const salaryFinded = await Salary.findOne({'EmployeeID': originalObject})

        if(salaryFinded){
            throw new CantDeleteEmployeeWithSalaryError(typeName);
        }
    }
}

class CantDeleteEmployeeWithSalaryError extends GNXError{
    constructor(typeName){
        super(
            typeName,
            'Employee have at least 1 salary related'
        )
    }
}

const CantDeleteEmployeeWithTitle = {
    validate: async function(typeName,originalObject,materializeObject){
        const titleFinded = await Title.findOne({'EmployeeID': originalObject})

        if(titleFinded){
            throw new CantDeleteEmployeeWithTitleError(typeName);
        }
    }
}

class CantDeleteEmployeeWithTitleError extends GNXError{
    constructor(typeName){
        super(
            typeName,
            'Employee have at least 1 title related'
        )
    }
}

const CantDeleteEmployeeWithDeptManager = {
    validate: async function(typeName,originalObject,materializeObject){
        const Dept_ManagerFinded = await dept_manager.findOne({'EmployeeID': originalObject})

        if(Dept_ManagerFinded){
            throw new CantDeleteEmployeeWithDeptManagerError(typeName);
        }
    }
}

class CantDeleteEmployeeWithDeptManagerError extends GNXError{
    constructor(typeName){
        super(
            typeName,
            'Employee have at least 1 dept_manager related'
        )
    }
}

const CantDeleteEmployeeWithDeptEmployee = {
    validate: async function(typeName,originalObject,materializeObject){
        const Dept_employeeFinded = await dept_employee.findOne({'EmployeeID': originalObject})

        if(Dept_employeeFinded){
            throw new CantDeleteEmployeeWithDeptEmployeeError(typeName);
        }
    }
}

class CantDeleteEmployeeWithDeptEmployeeError extends GNXError{
    constructor(typeName){
        super(
            typeName,
            'Employee have at least 1 dept_employee related'
        )
    }
}

module.exports = {
    ValidateDni,
    ValidateAge,
    CantDeleteEmployeeWithDeptEmployee,
    CantDeleteEmployeeWithDeptManager,
    CantDeleteEmployeeWithSalary,
    CantDeleteEmployeeWithTitle
}
const gnx = require('@simtlix/gnx');
const graphql= require('graphql');
const { AuditableObjectFields } = require('./extended/auditableGraphQLObjectType');

const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLID,
} = graphql;

const Employee = require('../models/employees');
const GenderEnumType = require('./enum/gender.enum');
const {
    ValidateDni,
    ValidateAge,
    CantDeleteEmployeeWithDeptEmployee,
    CantDeleteEmployeeWithSalary,
    CantDeleteEmployeeWithTitle,
    CantDeleteEmployeeWithDeptManager
} = require('../validators/employee.validator')

const EmployeeType = new GraphQLObjectType({
    name:'EmployeeType',
    description: 'Represent Employee',
    extensions: {
        validations: {
            CREATE : [ValidateDni,ValidateAge],
            UPDATE: [ValidateAge],
            DELETE: [
                CantDeleteEmployeeWithDeptEmployee,
                CantDeleteEmployeeWithDeptManager,
                CantDeleteEmployeeWithSalary,
                CantDeleteEmployeeWithTitle
            ]
        }
    },
    fields: () => Object.assign(AuditableObjectFields,{
        id: {type: GraphQLNonNull(GraphQLID)},
        dni: {type: GraphQLNonNull(GraphQLString)},
        first_name: {type: GraphQLNonNull(GraphQLString)},
        last_name: {type: GraphQLNonNull(GraphQLString)},
        gender: {type: GraphQLNonNull(GenderEnumType)},
        birth_date: {type: GraphQLNonNull(GraphQLString)},
        hire_date: {type: GraphQLString}
    })
});

gnx.connect(Employee,EmployeeType,'employee','employess');
module.exports = EmployeeType;
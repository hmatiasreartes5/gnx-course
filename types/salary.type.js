const gnx = require('@simtlix/gnx');
const graphql= require('graphql');
const { AuditableObjectFields } = require('./extended/auditableGraphQLObjectType');

const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLFloat,
    GraphQLObjectType
} = graphql;

const Employee = require('../models/employees');
const Salary = require('../models/salaries');
const EmployeeType = require('./employee.type');
const {
    ValidateDateInterval
} = require('../validators/salary.validator');

const SalaryType = new GraphQLObjectType({
    name: 'SalaryType',
    description: 'Represent salary assigned to an employee',
    extensions : {
        validations: {
            CREATE: [ValidateDateInterval],
            UPDATE: [ValidateDateInterval]
        }
    },
    fields: () => Object.assign(AuditableObjectFields,{
        id: {type: GraphQLID},
        employee: {
            type: EmployeeType,
            extensions: {
                relation: {
                    connectionField: 'EmployeeID',
                    embedded: true
                }
            },
            resolve(parent, args){
                return Employee.findById(parent.EmployeeID)
            }
        },
        salary: {type: GraphQLNonNull(GraphQLFloat)},
        from_date: {type: GraphQLString},
        to_date: {type: GraphQLString} 
    })
});

gnx.connect(Salary,SalaryType,'salary','salaries');
module.exports = SalaryType;




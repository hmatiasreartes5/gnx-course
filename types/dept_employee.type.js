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

const Dept_employee = require('../models/dept_employee');
const Employee = require('../models/employees');
const Department = require('../models/departments');
const DepartmentType = require('./department.type');
const EmployeeType = require('./employee.type');

const {
    ValidateDeptEmployeeDateInterval
} = require('../validators/dept_employee.validator');

const Dept_employeeType = new GraphQLObjectType({
    name: 'DepartmentEmployeeType',
    description: 'Represent the employee of a department',
    extensions: {
        validations: {
            CREATE: [ValidateDeptEmployeeDateInterval],
            UPDATE: [ValidateDeptEmployeeDateInterval]
        }
    },
    fields: () => Object.assign(AuditableObjectFields,{
        id: {type: GraphQLNonNull(GraphQLID)},
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
        department: {
            type: DepartmentType,
            extensions:{
                relation: {
                    connectionField: 'DepartmentID',
                    embedded: true
                }
            },
            resolve(parent,args){
                return Department.findById(parent.DepartmentID)
            }
        },
        from_date: {type: GraphQLString},
        to_date: {type: GraphQLString} 
    })
});

gnx.connect(Dept_employee,Dept_employeeType,'dept_employee','depts_employee');
module.exports = Dept_employeeType;


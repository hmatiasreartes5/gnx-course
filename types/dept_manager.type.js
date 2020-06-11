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

const Dept_manager = require('../models/dept_manager');
const Employee = require('../models/employees');
const Department = require('../models/departments');
const DepartmentType = require('./department.type');
const EmployeeType = require('./employee.type');

const {
    ValidateDeptManagerDateInterval
} = require('../validators/dept_manager.validator');

const Dept_managerType = new GraphQLObjectType({
    name: 'DepartmentManagerType',
    description: 'Represent the manager of a department',
    extensions: {
        validations: {
            CREATE: [ValidateDeptManagerDateInterval],
            UPDATE: [ValidateDeptManagerDateInterval]
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

gnx.connect(Dept_manager,Dept_managerType,'dept_manager','depts_manager');
module.exports = DepartmentType;
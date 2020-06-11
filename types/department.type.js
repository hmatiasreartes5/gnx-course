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

const Department = require('../models/departments');
const {
    ValidateNameDepartment,
    CantDeleteDepartmentWithDeptEmployee,
    CantDeleteDepartmentWithDeptManager
} = require('../validators/department.validator');

const DepartmentType = new GraphQLObjectType({
    name: 'DepartmentType',
    description: 'Reprensent department',
    extensions:{
        validations: {
            CREATE: [ValidateNameDepartment],
            UPDATE: [ValidateNameDepartment],
            DELETE: [
                CantDeleteDepartmentWithDeptEmployee,
                CantDeleteDepartmentWithDeptManager
            ]
        }
    },
    fields: () => Object.assign(AuditableObjectFields,{
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLNonNull(GraphQLString)}
    })
})



gnx.connect(Department,DepartmentType,'department','departments');
module.exports = DepartmentType
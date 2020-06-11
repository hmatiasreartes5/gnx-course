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

const Title = require('../models/titles');
const EmployeeType = require('./employee.type');
const {
    ValidateTitleDateInterval
} = require('../validators/title.validator');

const TitleType = new GraphQLObjectType({
    name: 'TitleType',
    description: 'Represent title assigned to an employee',
    extensions: {
        validations: {
            CREATE: [ValidateTitleDateInterval],
            UPDATE: [ValidateTitleDateInterval]
        }
    },
    fields: () => Object.assign(AuditableObjectFields,{
        id: {type: GraphQLNonNull(GraphQLID)},
        employee : {
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
        title: {type: GraphQLNonNull(GraphQLString)},
        from_date: {type: GraphQLString},
        to_date: {type: GraphQLString}
    })
});

gnx.connect(Title,TitleType,'title','titles');
module.exports = TitleType;
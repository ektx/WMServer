const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
} = require('graphql')

const callbackTypeFields = {
    success: {
        type: GraphQLBoolean,
        description: '成功失败'
    },
    mes: {
        type: GraphQLString,
        description: '说明信息'
    }
}

exports.callbackTypeFields = callbackTypeFields
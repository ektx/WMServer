const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
} = require('graphql')


module.exports = function(name = 'resFeedbackBaseMod2', obj) {

    let def = {
        success: {
            type: GraphQLBoolean,
            description: '成功失败'
        },
        mes: {
            type: GraphQLString,
            description: '说明信息'
        }
    }

    return new GraphQLObjectType({
        name,
        description: '默认返回基础请求格式',
        fields: () => ({
            ...def,
            ...obj
        })
    })
}
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
} = require('graphql')

const resObj = {
    success: {
        type: GraphQLBoolean,
        description: '成功失败'
    },
    mes: {
        type: GraphQLString,
        description: '说明信息'
    }
}
exports.resObj = resObj

exports.resGQ = new GraphQLObjectType({
    name: 'resFeedbackBaseMod',
    description: '默认返回基础请求格式',
    fields: () => (resObj)
})
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
} = require('graphql')

/**
 * 
 * @param {string} name 请求名称
 * @param {object} obj 数据内容
 * @param {boolean} useData 使用 Data 格式
 */
module.exports = function(name = 'resFeedbackBaseMod2', obj, useData) {
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
    let fileds = {
        ...def,
        ...obj
    }

    if (useData) {
        fileds = {
            ...def,
            data: obj
        }
    }

    return new GraphQLObjectType({
        name,
        description: '默认返回基础请求格式',
        fields: () => (fileds)
    })
}
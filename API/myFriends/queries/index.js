const {
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

const db = require('../models')
const { queryType } = require('../types')

module.exports = {
    type: new GraphQLList(queryType),
    description: '查询我的通讯录人员列表',
    args: {
        account: {
            name: 'account',
            type: new GraphQLNonNull(GraphQLString),
            description: '账号'
        },
        frindName: {
            name: 'frindName',
            type: GraphQLString,
            description: '联系人关键字，默认所有'
        },
        limit: {
            name: 'limit',
            type: GraphQLInt,
            description: '查寻数量,默认20'
        },
        start: {
            name: 'start',
            type: GraphQLInt,
            description: '开始索引，默认0'
        }
    },
    resolve (root, params, req) {
        let options = {
            limit: 20,
            start: 0,
            frindName: '.'
        }
        // 如果有 token 的解码,证明来自客户端口,非测试
        if (req.decoded) {
            params.account = req.decoded.user
        }

        // 合并默认值
        params = Object.assign(options, params)

        return new Promise((resolve, reject) => {
            db.find(
                {
                    account: params.account,
                    friendName: {
                        $regex: new RegExp(params.frindName)
                    }
                },
                null,
                (err, data) => {
                    if (err) {
                        return reject(err)
                    }
    
                    resolve(data)
                }
            )
        })

    }
}
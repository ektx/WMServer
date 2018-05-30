const {
	GraphQLString,
	GraphQLList,
	GraphQLInt
} = require('graphql')

const db = require('../models/events')

const {
	addEvtIntType,
	find_todoEvent_type,	
} = require('../types/events')

exports.findTodoEventList = {
	type: new GraphQLList(find_todoEvent_type),
	description: '查询事件列表',
	args: {
		account: {
			name: 'account',
			type: GraphQLString,
			description: '查询的用户'
		},
		types: {
			name: 'types',
			type: GraphQLString,
			description: '查询的事件类别'
		},
		stime: {
			name: 'stime',
			type: GraphQLString,
			description: '查询开始时间'
		},
		etime: {
			name: 'etime',
			type: GraphQLString,
			description: '查询结束时间'
		},
		start: {
			name: 'start',
			type: GraphQLInt,
			description: '开始索引'
		},
		limit: {
			name: 'limit',
			type: GraphQLInt,
			description: '查寻数量'
		},
		complete: {
			type: GraphQLInt,
			description: '完成状态，0所有，1完成，2末完成',
			defualtValue: -1
		}
	},
	resolve (root, params, req) {
		let timeQueryOption = {
			stime: {
				'$lte': new Date(params.etime)
			},
			etime: {
				// 查询开始时间
				'$gte': new Date(params.stime)
			}
		}
		let queryOption = {
			account: params.account,
			eventTypeID: params.types
		}

		// 如果有 token 的解码,证明来自客户端口,非测试
		if (req.decoded) {
			queryOption.account = req.decoded.user
		}

		params.start = params.start || 0
		params.limit = params.limit || 100

		// 如果有时间区间
		if (params.stime && params.etime) {
			Object.assign(queryOption, timeQueryOption)
		}

		// 判断用户是否要查询对应的完成状态
		if (params.complete > 0) {
			Object.assign(queryOption, {
				complete: params.complete < 2
			})
		}

		// 查看指定用户的指定列表事件
		// 以修复时间为倒序返回
		let dataPromise = new Promise((resolve, reject) => {
			db.find(
				queryOption,
				null,
				{
					limit: params.limit,
					sort: { ctime: -1 }
				},
				(err, data) => {
					err ? reject(err) : resolve(data)
				}
			)
		})

		return dataPromise
	}
}


exports.findTodoEvent = {
    type: find_todoEvent_type,
    description: '查询单个事件',
    args: {
        id: {
            type: GraphQLString,
            description: '事件 ID'
        }
    },
    resolve (root, args, req) {
        return new Promise((res, rej) => {
            db.findOne(
                {id: args.id},
                null,
                (err, data) => {
                    console.log(data)
                    err ? rej(err) : res(data)
                }
            )
        })
    }
}
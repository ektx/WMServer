const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql')
const db = require('../models/user')
const { userType, userCountType } = require('../types')
const res = require('../../res2')

// 查询用户
exports.findUser = {
	type: res('ResFindUser', {
		type: userType,
		description: '信息说明'
	}, true),
	description: '查询用户信息',
	args: {
		account: {
			type: GraphQLString,
			description: '帐号'
		},
		name: {
			type: GraphQLString,
			description: '用户名'
		} 
	},
	resolve(root, args, req) {
	    return new Promise((resolve, reject) => {
			args = Object.assign({}, {
				account: req.decoded ? req.decoded.user : '',
				name: ''
			}, args)

			db.findOne(
				{ $or: [ 
					{account: args.account }, 
					{name: args.name} 
				] }, 
				{pwd: 0},
				(err, data) => {
					if (err) {
						reject(err)
						return
					}

					if (data) {
						resolve({
							success: true,
							mes: '查询成功',
							data
						})
					} else {
						resolve({
							success: false,
							mes: '查询失败'
						})
					}
				}
			)
		})
	}
}

// 查询用户总数
exports.findUserCount = {
	type: res('ResUserCount', {
		type: userCountType,
		description: '用户总数'
	}, true),
	description: '查询用户总数',
	args: {},
	resolve(root, args, req) {
		return new Promise((resolve, reject) => {
			resolve({
				success: true,
				mes: '查询成功',
				data: {
					count: db.count()
				}
			})
		})
	}
}
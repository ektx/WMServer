const { GraphQLString, GraphQLInt } = require('graphql')
const db = require('../models/user')
const { UserFields, userType } = require('../types')
const res = require('../../res2')

// 查询用户
exports.findUser = {
	type: res('ResFindUser', UserFields),
	description: '查询用户信息',
	args: {
		// 帐号
		account: {
			name: 'account',
			type: GraphQLString,
			description: '帐号'
		},
		// 用户名
		name: {
			name: 'name',
			type: GraphQLString,
			description: '用户名'
		} 
	},
	resolve(root, args, req) {
		let def = {
			account: '',
			name: ''
		}

	    return new Promise((resolve, reject) => {
			args = Object.assign({}, def, args)

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
							...data._doc
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
		count: {
			type: GraphQLInt,
			description: '用户总数'
		}
	}),
	description: '查询用户总数',
	args: {},
	resolve(root, args, req) {
		return new Promise((resolve, reject) => {
			let count = db.count()

			resolve({
				success: true,
				mes: '查询成功',
				count
			})
		})
	}
}
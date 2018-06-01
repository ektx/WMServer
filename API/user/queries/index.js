const { GraphQLString } = require('graphql')

const db = require('../models/user')

const { userType } = require('../types')

exports.findUser = {
	type: userType,
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
	resolve(root, params) {
		// 回调
	    return new Promise((resolve, reject) => {
	    	// mongoose 查询方式
	    	// 查询用户名或帐号
			db.findOne(
			{ $or: [ 
				{account: params.account }, 
				{name: params.name} 
			] }, 
			(err, data) => {
				err ? reject(err) : resolve(data)
			})
		})
	}
}
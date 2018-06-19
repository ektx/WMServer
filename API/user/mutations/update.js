const { GraphQLNonNull, GraphQLString } = require('graphql')
const { userIntputType } = require('../types')
const db = require('../models/user')
const res = require('../../res2')

exports.UserUpdate = {
	// 返回修改后用户信息
	type: res('ResUserUpdate'),
	description: '修改用户信息',
	args: {
		account: {
			description: '帐号',
			type: GraphQLString
		},
		data: {
			description: '更新内容',
			type: new GraphQLNonNull(userIntputType)
		}
	},
	resolve(root, args, req) {
		return new Promise((resolve, reject) => {
	
			if (req.decoded) {
				args.account = req.decoded.user
			}
	
			if (!args.account) {
				resolve({
					success: false,
					mes: '没有发现要修改的账号'
				})
			}

			// 删除对账号的修改
			delete args.data.account

			db.findOneAndUpdate(
				{ account: args.account },
				args.data,
				(err, data) => {
					if (err) {
						reject({
							success: false,
							mes: err
						})
						return;
					}
					
					resolve({
						success: true,
						mes: '更新成功'
					})
				}
			)
		})
	}
}

const {
	GraphQLString,
	GraphQLNonNull
} = require('graphql')

const { 
	baseFields, 
	saveCallbackType, 
	updateCallback 
} = require('../types/workType')
const { workTypeDB } = require('../models')

const add = {
	type: saveCallbackType,
	description: '添加分类',
	args: baseFields,
	resolve(root, parmas, req) {
		// 自动添加创建时间
		parmas.ctime = new Date()

		// 如果有 token 的解码,证明来自客户端口,非测试
		// 添加用户
		if (req.decoded) {
			parmas.account = req.decoded.user
		} else {
			if (!parmas.account) {
				return {
					success: false,
					mes: '请输入用户'
				}
			}
		}

		parmas.id = parmas.account + parmas.ctime.getTime()

		if (!parmas.name) 
			return {
				mes: `not have 'name' value`,
				success: false
			}

		return new Promise((resole, reject) => {
			const model = new workTypeDB(parmas)
			model.save((err, data) => {
				if (err) {
					reject({
						success: false,
						mes: '添加提醒分类出错',
						id: null
					})
					return
				}
				resole( {
					success: true,
					mes: '添加成功',
					id: parmas.id
				})
			})
		})
	}
}


const remove = {
	type: GraphQLString,
	description: '删除提醒分类',
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLString),
			description: 'id'
		},
		account: {
			name: 'account',
			type: GraphQLString,
			description: '删除用户'
		}
	},
	resolve(root, parmas, req) {
		// 如果有 token 的解码,证明来自客户端口,非测试
		// 添加用户
		let account = req.decoded ? req.decoded.user : '';

		let remove = new Promise((resolve, reject) => {
			DM.workType_M.remove(
				{id: parmas.id, account },
				(err, data) => {
					if (err) {
						reject(JSON.stringify(err));
						return;
					}

					resolve( JSON.stringify(data.result) )
				}
			)
		})

		return remove
	}

}


const update = {
	type: updateCallback,
	description: '更新提醒分类',
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLString),
			description: '更新类型 id'
		},
		name: {
			name: 'name',
			type: new GraphQLNonNull(GraphQLString),
			description: '重新命名'
		},
		account: {
			type: GraphQLString,
			description: '用户'
		}
	},
	resolve(root, parameter, req) {
		// 如果有 token 的解码,证明来自客户端口,非测试
		// 添加用户
		if (req.decoded) {
			parameter.account = req.decoded.user
		} else {
			if (!parameter.account) {
				return {
					success: false,
					mes: '请输入用户'
				}
			}
		}

		return new Promise((resolve, reject) => {
			workTypeDB.update(
				{ id: parameter.id },
				{name: parameter.name},
				(err, data) => {
					if (err) {
						reject({
							success: false,
							mes: '更新失败'
						})
						return
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

module.exports = {
	add,
	remove,
	update,
}
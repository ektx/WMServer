
const {
	GraphQLString,
	GraphQLNonNull
} = require('graphql')

const { baseFields, saveCallbackType } = require('../types/workType')
const DM = require('../../../models/todolist/workType')

const add = {
	type: saveCallbackType,
	description: '添加分类',
	args: baseFields,
	resolve(root, parmas, req) {

		// 如果有 token 的解码,证明来自客户端口,非测试
		// 添加用户
		if (req.decoded) {
			parmas.account = req.decoded.user;
		}
		parmas.id = parmas.account + (new Date()).getTime()

		if (!parmas.name) 
			return {
				mes: `not have 'name' value`,
				success: false
			}
		
		return new Promise((resole, reject) => {
			const model = new DM.workType_M(parmas)
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
	type: GraphQLString,
	description: '更新提醒分类',
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLString),
			description: '更新类型 id'
		},
		name: {
			name: 'name',
			type: GraphQLString,
			description: '重新命名'
		}
	},
	resolve(root, params) {
		
		let update = new Promise((resolve, reject) => {
			DM.workType_M.update(
				{ id: params.id },
				{name: params.name},
				(err, data) => {

					if (err) {
						reject(JSON.stringify(err));
						return;
					}
					resolve(JSON.stringify(data))
				}
			)
		})

		return update
	}

}

module.exports = {
	add,
	remove,
	update,
}
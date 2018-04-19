const {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
} = require('graphql/type');
const { callbackTypeFields } = require('../../types')


const fieldsObj = {
	account: {
		type: GraphQLString,
		description: '用户'
	},
	name: {
		type: GraphQLString,
		description: '名称'
	}
}
exports.baseFields = fieldsObj


const workType = new GraphQLObjectType({
	name: 'workType',
	description: '提醒工作分类',
	fields: () => (Object.assign({}, fieldsObj, {
		id: {
			type: GraphQLString,
			description: '事件类型 ID',
		},
		ctime: {
			type: GraphQLString,
			description: '创建时间'
		}
	}))
})
exports.workType = workType


const workTypeIntType = new GraphQLInputObjectType({
	name: 'workTypeIntType',
	description: '保存事件类型',
	fields: () => (fieldsObj)
})
exports.workTypeIntType = workTypeIntType


const saveCallbackType = new GraphQLObjectType({
	name: 'saveCallbackType',
	description: '保存返回信息',
	fields: () => (Object.assign({}, callbackTypeFields, {
		id: {
			type: GraphQLString,
			description: '保存信息 ID'
		}
	}))
})
exports.saveCallbackType = saveCallbackType


exports.updateCallback = new GraphQLObjectType({
	name: 'updateCallback',
	description: '更新事件类型返回信息',
	fields: () => (Object.assign({}, callbackTypeFields))
})
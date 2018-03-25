const {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
} = require('graphql/type');
const { callbackTypeFields } = require('../../types')


const fieldsObj = {
	account: {
		type: GraphQLString,
		description: '用户',
	},
	name: {
		type: GraphQLString,
		description: '名称',
	},
	ctime: {
		type: GraphQLString,
		description: '创建时间'
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
	name: 'callbackType',
	description: '保存返回信息',
	fields: () => (Object.assign({}, callbackTypeFields, {
		id: {
			type: GraphQLString,
			description: '保存信息 ID'
		}
	}))
})
exports.saveCallbackType = saveCallbackType
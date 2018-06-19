const {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLInt,
	GraphQLString
} = require('graphql/type')
const fieldsObj = {
	account: {
		type: GraphQLString,
		description: '帐号',
	},
	name: {
		type: GraphQLString,
		description: '名称',
	},
	email: {
		type: GraphQLString,
		description: '邮箱',
	},
	ico: {
		type: GraphQLString,
		description: '图标',
	},
	pwd: {
		type: GraphQLString,
		description: '用户密码'
	},
	power: {
		type: GraphQLString,
		description: '用户权限',
	},
	reset: {
		type: GraphQLString,
		description: '找回密码Code',
	}
}

exports.UserFields = fieldsObj

exports.userType = new GraphQLObjectType({
	name: 'user',
	description: '用户',
	fields: () => (fieldsObj)
})

exports.userIntputType = new GraphQLInputObjectType({
	name: 'userIntType',
	description: '添加或修改用户信息',
	fields: () => (fieldsObj)
})

exports.userCountType = new GraphQLObjectType({
	name: 'userCountType',
	description: '查询用户总数',
	fields: () => ({
		count: {
			type: GraphQLInt,
			description: '注册用户总数'
		}
	})
})
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} = require('graphql')

const innerType = new GraphQLObjectType({
    name: 'innerType',
    description: '子内容',
    fields: () => ({
        label: {
            type: GraphQLString,
            description: '标题'
        },
        inner: {
            type: GraphQLString,
            description: '内容'
        }
    })
})

const innerIntType = new GraphQLInputObjectType({
    name: 'innerIntType',
    description: '子内容',
    fields: () => ({
        label: {
            type: GraphQLString,
            description: '标题'
        },
        inner: {
            type: GraphQLString,
            description: '内容'
        }
    })
})

const fieldsObj = {
    account: {
        type: GraphQLString,
        description: '账号'
    },
    friendName: {
        type: GraphQLString,
        description: '联系人名称'
    },
    tel: {
        type: new GraphQLList(innerType),
        description: '电话'
    },
    email: {
        type: new GraphQLList(innerType),
        description: '邮件'
    },
    remark: {
        type: GraphQLString,
        description: '备注'
    }
}


const saveFieldsObj = Object.assign({}, fieldsObj, {
    account: {
        type: new GraphQLNonNull(GraphQLString),
        description: '账号'
    },
    friendName: {
        type: new GraphQLNonNull(GraphQLString),
        description: '联系人名称'
    },
    tel: {
        type: new GraphQLList(innerIntType),
        description: '电话'
    },
    email: {
        type: new GraphQLList(innerIntType),
        description: '邮件'
    }
})

// 用于查询
exports.queryType = new GraphQLObjectType({
    name: 'queryFriendsInAddress',
    description: '用户的通讯录',
    fields: () => (Object.assign({}, fieldsObj, {
        id: {
            type: GraphQLString,
            description: '_id'
        },
        ctime: {
            type: GraphQLString,
            description: '创建时间'
        },
        mtime: {
            type: GraphQLString,
            description: '修改时间'
        },
    }))
})

// 用于保存或更新
exports.saveType = new GraphQLInputObjectType({
    name: 'SaveUserToAddress',
    description: '用户的通讯录',
    fields: () => (saveFieldsObj)
})
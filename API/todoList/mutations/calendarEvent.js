
const {
	GraphQLString,
	GraphQLNonNull
} = require('graphql')

const { saveCalendar_FB } = require('../types')

const db = require('../../../models/todolist/calendarEvent')
const { updateDB } = require('./calendarFun')
/*
	使用示例:
	mutation {
	  removeCalendarEvent(
	    account:"ektx",
	    id: "1504493147795"
	  )
	}
*/
const remove = {
	type: GraphQLString,
	description: '删除日历',
	args: {
		account: {
			name: 'account',
			type: new GraphQLNonNull(GraphQLString),
			description: '删除的用户名'
		},
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLString),
			description: 'eventTypeID 值'
		}
	},
	resolve(root, pargs, req) {
		
		pargs.account = req.decoded ? req.decoded.user : pargs.account;

		const remove = new Promise((resolve, reject) => {
			db.remove(
				{
					account: pargs.account,
					eventTypeID: pargs.id
				},
				(err, data) => {
					if (err) {
						reject(err);
						return;
					}

					resolve( JSON.stringify(data.result) )
				}
			)
		})

		return remove
	}
}

/*
	使用示例:
	mutation {
		saveCalendarEvent(
			account: "ektx",
			id: "1504493147795",
			stime: "2017/9/10",
			etime: "2018/9/11",
			type: "del"
		)
	}
*/
const save = {
	type: saveCalendar_FB,
	description: '创建或更新',
	args: {
		account: {
			name: 'account',
			type: new GraphQLNonNull(GraphQLString),
			description: '关联用户'
		},
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLString),
			description: '关联类别值'
		},
		stime: {
			name: 'stime',
			type: new GraphQLNonNull(GraphQLString),
			description: '开始时间,如: 2017/9/10'
		},
		etime: {
			name: 'etime',
			type: new GraphQLNonNull(GraphQLString),
			description: '结束时间,如: 2017/10/1'
		},
		type: {
			name: 'type',
			type: GraphQLString,
			description: 'add(加,默认) | del(减)'
		}
	},
	resolve(root, pargs, req) {

		pargs.account = req.decoded ? req.decoded.user : pargs.account;

		// 更新数据库
		return (async () => {
			return await updateDB(pargs)
		})()
	}
}

module.exports = {
	remove,
	save
}

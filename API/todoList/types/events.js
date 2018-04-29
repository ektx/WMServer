const {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLBoolean,
	GraphQLInt
} = require('graphql')

const {
	saveCalendar_feedback
} = require('../types/calendarEvent')

let evtBaseInfo = {
	eventTypeID: {
		type: GraphQLString,
		description: '事件类别 ID'
	},
	title: {
		type: GraphQLString,
		description: '标题'
	},
	complete: {
		type: GraphQLBoolean,
		description: '是否完成'
	},
	// ttime: {
	// 	type: GraphQLString,
	// 	description: '提醒时间, new Date().toISOString() => "2017-08-30T03:04:14.162Z"'
	// },
	stime: {
		type: GraphQLString,
		description: '开始时间, "2017-08-30T03:04:14.162Z"'
	},
	etime: {
		type: GraphQLString,
		description: '结束时间, "2017-08-30T03:04:14.162Z"'
	},
	inner: {
		type: GraphQLString,
		description: 'inner'
	}	
}

const fieldsObj = {
	id: {
		type: GraphQLString,
		description: '事件ID'
	},
	account: {
		type: GraphQLString,
		description: '用户'
	},
	eventTypeID: {
		type: GraphQLString,
		description: '事件类别 ID'
	},
	title: {
		type: GraphQLString,
		description: '标题'
	},
	complete: {
		type: GraphQLBoolean,
		description: '是否完成'
	},
	ctime: {
		type: GraphQLString,
		description: `创建时间, new Date().toISOString() => "2017-08-30T03:04:14.162Z"`
	},
	mtime: {
		type: GraphQLString,
		description: '修改时间, new Date().toISOString() => "2017-08-30T03:04:14.162Z"'
	},
	ttime: {
		type: GraphQLString,
		description: '提醒时间, new Date().toISOString() => "2017-08-30T03:04:14.162Z"'
	},
	stime: {
		type: GraphQLString,
		description: '开始时间, new Date().toISOString() => "2017-08-30T03:04:14.162Z"'
	},
	etime: {
		type: GraphQLString,
		description: '结束时间, new Date().toISOString() => "2017-08-30T03:04:14.162Z"'
	},
	inner: {
		type: GraphQLString,
		description: 'inner'
	}
}


const eventsType = new GraphQLObjectType({
	name: 'events',
	description: '--',
	fields: () => (fieldsObj)
})

exports.events_TYPE = eventsType


const eventsIntType = new GraphQLInputObjectType({
	name: 'events_add',
	description: '提醒事件',
	fields: () => (fieldsObj)
})
exports.events_INTTYPE = eventsIntType

// new
exports.addEvtIntType = new GraphQLInputObjectType({
	name: 'todo_evt_add_int',
	description: '添加事件',
	fields: () => (evtBaseInfo)
})


const updateEventIntType = new GraphQLInputObjectType({
	name: 'events_update',
	description: '提醒事件',
	fields: () => ({
		eventTypeID: {
		  type: GraphQLString,
		  description: '事件类别 ID'
		},
		title: {
			type: GraphQLString,
			description: '标题'
		},
		complete: {
			type: GraphQLBoolean,
			description: '是否完成'
		},
		ttime: {
			type: GraphQLString,
			description: '提醒时间'
		},
		stime: {
			type: GraphQLString,
			description: '开始时间'
		},
		etime: {
			type: GraphQLString,
			description: '结束时间'
		},
		inner: {
			type: GraphQLString,
			description: '备注说明'
		}		
	})
})
exports.updateEvent_INTTYPE = updateEventIntType



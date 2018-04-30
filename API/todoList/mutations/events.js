const {
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType
} = require('graphql')
const { 
	events_INT, 
	evtUpdate_INT,
	// evtSave_FB,
	saveCalendar_FB 
} = require('../types')
const {
	addEvtIntType,
	find_todoEvent_type,	
} = require('../types/events')

const db = require('../models/events')
const calendarEvt = require('./calendarEvent')
const { resGQ, resObj } = require('../../res')
const { updateEvtCalendar } = require('./calendarFun')

exports.todo_evt_add = {
	type: new GraphQLObjectType({
		name: 'saveTodoEvent',
		description: '保存事件',
		fields: () => ({
			...resObj,
			data: {
				description: '添加成功后的事件 ID',
				type: GraphQLString
			}
		})
	}),
	description: '事件添加',
	args: {
		usr: {
			type: GraphQLString,
			description: '用户'
		},
		data: {
			type: addEvtIntType,
			description: '保存信息'
		}
	},
	resolve(root, args, req) {
		let account = req.decoded ? req.decoded.user : args.usr
		let time = new Date

		Object.assign(args.data, {
			account,
			id: `${+ time}_${account}`,
			ctime: time,
			mtime: time
		})

		const model = new db(args.data)

		return (async () => {
			const calendar = await updateEvtCalendar({
				account: account,
				id: args.data.eventTypeID,
				stime: args.data.stime,
				etime: args.data.etime
			})

			if (!calendar.success) {
				return { success: false }
			}

			const event = await model.save()

			if (!event) return { success: false }
			else return {
				success: true,
				mes: '添加成功',
				data: event.id
			}
		})()
	}

}


exports.todo_evt_remove = {
	type: resGQ,
	description: '删除提醒分类',
	args: {
		id: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'id'
		},
		usr: {
			type: GraphQLString,
			description: '用户'
		}
	},
	resolve(root, args, req) {
		args.usr = req.decoded ? req.decoded.user : args.usr

		async function removeTime () {
			let removeEvt = await removeData(args.id, args.usr)

			if (removeEvt.success) {
				removeEvt = await updateEvtCalendar({
					account: removeEvt.data.account,
					id: removeEvt.data.eventTypeID,
					stime: removeEvt.data.stime,
					etime: removeEvt.data.etime,
					type: 'del'
				})

				removeEvt.mes = removeEvt.success ? `删除成功` : `删除失败`
			}

			return removeEvt
		}

		return (async () => {
			return await removeTime()
		})()
	}

}


exports.todo_evt_update = {
	type: resGQ,
	description: '更新提醒分类',
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLString),
			description: '更新 ID'
		},
		usr: {
			type: GraphQLString,
			description: '更新的用户'
		},
		data: {
			type: addEvtIntType,
			description: '更新的内容'
		}
	},
	resolve(root, args, req) {
		// 应用用户
		args.usr = req.decoded ? req.decoded.user : args.usr

		Object.assign(args.data, {
			mtime: new Date,
		})
		
		function findData() {
			return new Promise((resolve, reject) => {
				db.findOne(
					{
						id: args.id,
						account: args.usr
					},
					(err, data) => {
						if (err) return reject(err);
						resolve(data)
					}
				)
			})
		}

		// 保存数据
		function saveDate () {
			return new Promise((resolve, reject) => {
				db.update(
					{ 
						id: args.id, 
						account: args.usr 
					},
					args.data,
					{upsert: true},
					(err, data) => {
						if (err) {
							reject(JSON.stringify(err))
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

		return (async () => {

			let findThisData = await findData()
			let result = {}

			// 存在数据 
			if (!!findThisData) {
				// 只有时间有变化才更新日历
				if (
					+new Date(args.data.stime) !== +new Date(findThisData.stime) 
					|| 
					+new Date(args.data.etime) !== +new Date(findThisData.etime)
					|| 
					args.eventTypeID !== findThisData.eventTypeID
				) {
					// 删除旧的时间
					result.delTime = await updateEvtCalendar({
						account: args.usr,
						id: findThisData.eventTypeID,
						stime: findThisData.stime,
						etime: findThisData.etime,
						type: 'del'
					})
					// 添加新的时间
					result.addTime = await updateEvtCalendar({
						account: args.usr,
						id: args.data.eventTypeID,
						stime: args.data.stime,
						etime: args.data.etime
					})
				}
	
				// 保存数据 [string]
				result = await saveDate()
			}
			// 不存在
			else {
				result = {
					success: false,
					mes: '不存在更新数据!'
				}
			}

			return result
		})()
	}
}


function removeData (id, account) {
	return new Promise((resolve, reject) => {
		db.findOneAndRemove(
			{ id, account },
			(err, data) => {
				if (err || !data) {
					resolve({
						success: false,
						mes: err
					})
					return
				}

				resolve({
					success: true,
					mes: `删除成功`,
					data
				})
			}
		)
	})
}
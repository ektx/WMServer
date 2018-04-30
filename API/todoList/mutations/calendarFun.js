const calendar = require('../../../bin/calendar')
const db = require('../../../models/todolist/calendarEvent')

/**
 * 更新日历事件
 * options 更新内容
 * @param {string} account 用户
 * @param {string} id 更新类别
 * @param {string} type add(加,默认) | del(减)
 * @param {string} stime 开始时间
 * @param {date} stime 开始时间
 * @param {date} etime 结束时间
 */
exports.updateEvtCalendar = function (options) {
	// 设置 type
	options.type = options.type && options.type === 'del' ? -1 : 1

	// 获取2个时间点间的日期与天数
	let updateCalTime = calendar.howMonths(options.stime, options.etime)

	// 遍历天
	function loopCalTime (data) {
		let setData = {}

		// 格式化要更新的天数
		data.day.forEach(val => {
			setData[`data.${val}`] = options.type
		});

		// 返回要更新的月份
		return setCalendarEvent(
			options.account,
			options.id,
			data.time,
			setData
		)
	}

	// 更新
	async function updateDBCalTime() {
		let updatePromise = []
		let backDay = [] // 返回日期
		// 返回结果
		let result = {
			success: false,
			mes: `更新失败`,
			data: null
		}

		updateCalTime.forEach(val => {
            console.log(val)
			backDay.push( val )
			updatePromise.push( loopCalTime(val) )
		})

		// 保存信息
		let updatePromiseAll = await Promise.all(updatePromise)

		if (updatePromiseAll[0].n) {
			result = {
				success: true,
				mes: '更新成功',
				data: backDay
			}
		} 

		return result
	}

	return updateDBCalTime()
}


// 更新数据库
function setCalendarEvent (account, eventTypeID, time, data) {
	return new Promise((resolve, reject) => {
		db.update(
			{ account, eventTypeID, time },
			{ $inc: data },
			{ upsert: true },
			(err, data) => {
				if (err) {
					reject( err )
					return
				}
				resolve( data )
			}
		)
	})
}
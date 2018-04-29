
const workType = require('./workType')
const calendarEvent = require('./calendarEvent')
const events = require('./events')

module.exports = {
	addWorkType: workType.add,
	removeWorkType: workType.remove,
	updateWorkType: workType.update,

	// saveCalendarEvent: calendarEvent.save,
	removeCalendarEvent: calendarEvent.remove,
	...calendarEvent,

	// todoEvent_add: events.add,
	// saveTodoListEvent: events.save,
	// removeTodoListEvent: events.remove,
	...events
}
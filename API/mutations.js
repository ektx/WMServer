
const user = require('./user/mutations')
const todolist = require('./todolist/mutations')
const address = require('./myFriends/mutations')

module.exports = {
	userAdd: user.add,
	userUpdate: user.update,
	removeUser: user.remove,

	// todoList APP
	addTodoListType: todolist.addWorkType,
	removeTodoListType: todolist.removeWorkType,
	updateTodoListType: todolist.updateWorkType,

	// todoList - 日历功能
	// saveCalendarEvent: todolist.saveCalendarEvent,
	removeCalendarEvent: todolist.removeCalendarEvent,

	// todoList - 事件功能
	...todolist,

	// 添加用户
	addAddress: address.add,
	// 更新用户信息
	updateAddress: address.update
}
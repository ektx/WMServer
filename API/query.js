
const user = require('./user/queries')

const todoList = require('./todoList/queries')
const myFriends = require('./myFriends/queries')
console.log(todoList.events)
module.exports = {
  ...user,

  workTypes: todoList.workTypes,
  calendarEvent: todoList.calendarEvent,
  ...todoList,

  myFriends
}

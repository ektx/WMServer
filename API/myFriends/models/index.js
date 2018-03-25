
console.log('myFriends models db.js')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
/**
 * 通讯录功能
 * @param {String} account - 账号
 * @param {Object} friendName - 联系人列表
 * @param {Array} tel - 电话
 * @param {Array} email - 邮件
 * @param {Date} ctime - 创建时间
 * @param {Date} mtime - 修改时间
 * @param {String} remark - 备注
 * 
 * 文档: myFriends
 */

const _myfriends = new Schema({
	account: {
		type: String,
		require: true
	},
	friendName: {
		type: String,
		require: true
	},
	tel: [{
		label: String,
		inner: String
	}],
	email: [{
		label: String,
		inner: String
	}],
	ctime: Date,
	mtime: Date,
	remark: String
}, {collection: 'myFriends', versionKey: false})

module.exports = mongoose.model('myFriends', _myfriends)
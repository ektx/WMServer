const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * 提醒类别
 * @param {String} id - 类型Id
 * @param {String} account - 用户名/账号
 * @param {String} name - 名称/昵称
 * @param {Date} ctime - 创建时间
 * 
 * 文档: workType
 */
let _workType = {}

if (mongoose.models.hasOwnProperty('workType')) {
    _workType = mongoose.models.workType
} else {
    _workType = new Schema({
        id: {
            type: String,
            require: true,
            unique: true
        },
        account: String,
        name   : String,
        ctime: Date,
    }, {collection: 'workType', versionKey: false})

    _workType = mongoose.model('workType', _workType)
}

module.exports = _workType
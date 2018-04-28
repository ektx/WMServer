const RGM = require('../../registrationModel')

module.exports = RGM('todoList_events', {
    // 唯一的区别
    id: {
        type: String,
        require: true,
        unique: true
    },
    // 用户
    account: {
        type: String,
        require: true
    },
    // 事件类型 ID 用于保存分类
    eventTypeID: {
        type: String,
        require: true
    },
    // 标题
    title: String,
    // 是否完成
    complete: Boolean,
    // 创建时间
    ctime: Date,
    // 修改时间
    mtime: Date,
    // 提醒时间
    ttime: Date,
    // 开始时间
    stime: Date,
    // 结束时间
    etime: Date,
    // 内容
    inner: String
})
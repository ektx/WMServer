/**
 * 测试通讯录功能
 */

const db = require('../API/myFriends/models/index.js')

function test (req, res) {
    console.log(req.body)
    let _obj = {
        account: req.body.id,
        friendName: req.body.name
    }

    const _model = new db.myfriends_m( Object.assign(req.body, _obj) )
    const _newFriends = _model.save()

    if (!_newFriends) {
        console.log('Error!')
    }

    console.log(_newFriends)
}

module.exports = test
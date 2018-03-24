const { GraphQLNonNull, GraphQLString } = require('graphql')
const { saveType, queryType } = require('../types')
const db = require('../models')

module.exports = {
    type: queryType,
    description: '保存联系人',
	args: {
		data: {
			name: 'data',
			type: saveType,
			description: '更新的内容'
		}
	},
    resolve(root, pargs, req) {
		let _time = new Date().toISOString()
		let option = {
			ctime: _time,
			mtime: _time,
			account: req.decoded ? req.decoded.user : pargs.data.account
		}

		Object.assign(pargs.data, option)

		const newMod = new db(pargs.data)
		const saveTo = newMod.save()

		return saveTo ? saveTo : {success: false}

    }
}
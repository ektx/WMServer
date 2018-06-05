const { userType, userIntputType } = require('../types')
const db = require('../models/user')

module.exports.UserAdd = {
	type: userType,
	description: '添加用户',
	args: {
		data: {
			name: 'data',
			type: userIntputType
		}
	},
	resolve(root, params) {

		const uModel = new db(params.data)
		const newUser = uModel.save();

		if (!newUser) throw new Error('Error add new user!');

		return newUser;
	}
}
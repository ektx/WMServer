const { GraphQLNonNull, GraphQLString } = require('graphql')
const { saveType, queryType } = require('../types')
const db = require('../models')

module.exports = {
    type: GraphQLString,
    description: '保存联系人',
	args: {
        id: {
            type: GraphQLString,
            description: '更新 ID'
        },
		data: {
			name: 'data',
			type: saveType,
			description: '更新的内容'
        }
	},
    resolve(root, pargs, req) {

		Object.assign(pargs.data, {
            mtime: new Date().toISOString(),
            account: req.decoded ? req.decoded.user : pargs.data.account
		})

        console.log(pargs.data)
        
		return new Promise((resolve, reject) => {
            db.update(
                { _id: pargs.id },
                pargs.data,
                (err, data) => {
                    if (err) {
                        console.log(err)
                        // reject(err)
                        return
                    }
                    console.log(data)
                    resolve(JSON.stringify(data))
                }
            )
        })

    }
}
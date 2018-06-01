
/*
	用于验证用户的 token 是否合法
	--------------------------------
*/

const jwt = require('jsonwebtoken')
const tokenKey = 'expressTokenTest'

module.exports = function (req, res, next) {
	
	const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['X-Access-Token']

	// 对于添加用户 不需要验证token
	// if (req.body.query && req.body.query.includes('userAdd')) {
	// 	return next()
	// }

	if (token) {
		jwt.verify(token, tokenKey, (err, decoded) => {
			if (err || req.headers['user-agent'] !== decoded.userAgent) {
				return res.status(401).send({
					status: false,
					code: 10000,
					message: "token认证失败"
				})
			} else {
				req.decoded = decoded
				next()
			}
		})
	} else {
		return res.status(403).send({
			status: false,
			message: '没有发现token'
		})
	}
}
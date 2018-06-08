
const db_schemas = require('./models/user');
const jwt = require('jsonwebtoken')
const tokenKey = 'expressTokenTest'

/**
 * 登录功能
 * @param {object} req 请求信息
 * @param {object} res 返回信息
 */
function PostLogin (req, res) {

	let sendErr = ()=> {
		res.send({
			status: false,
			mes: '没有发现数据!'
		})
	}

	db_schemas.findOne(
		{'account': req.body.user},
		(err, data)=> {
			if (err) {
				res.send({
					status: false,
					mes: '服务器错误!'
				})				
				return;
			}

			if (data) {
				if (data.pwd === req.body.pwd) {
					let obj = Object.assign({}, req.body, {
						userAgent: req.headers['user-agent']
					})

					// 添加一个 token
					let token = jwt.sign(obj, tokenKey, {
						expiresIn: 60 * 60 // 60 * 60 // 在 1 小时后过期 60 * 60
					})

					res.send({
						status: true,
						mes: 'welcome use workMan!',
						token
					})

				} else {
					res.send({
						status: false,
						mes: '密码不正确!'
					})
				}
			} else {
				res.send({
					status: false,
					mes: '用户不存在!'
				})
			}
		}
	)
}

exports.login = PostLogin


exports.GetLogin = (req, res) => {
	res.redirect('/')
}
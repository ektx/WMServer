const db = require('../models/events')

module.exports = function (req, res) {
    console.log(req.body, req.decoded, req.header)

    if (!req.body.id) return res.send({
        success: false,
        mes: '没有保存文章 ID'
    })

    db.update(
        {
            id: req.body.id,
            account: req.decoded.user
        },
        {
            inner: req.body.inner
        },
        (err, data) => {
            if (err) {
                return res.send({
                    success: false,
                    mes: '更新失败'
                })
            }

            res.send({
                success: true,
                mes: '更新成功'
            })
        }
    )
}
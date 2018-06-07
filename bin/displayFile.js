const mime = require('mime')
const sendFile = require('../lib/sendFile')

/**
 * 显示用户请求信息
 * @param {object} req 请求信息
 * @param {object} res 返回信息
 */
module.exports = function (req, res) {

    let getNewPath = (dir) => {
        return `${process.cwd()}/upload/${dir}/${req.path.slice(3)}`
    }
    if (req.path.startsWith('/img/')) {
        let imgs = ['image/gif', 'image/jpeg', 'image/png']
        let filePath = `${process.cwd()}/upload/${req.path}`
        let fileType = mime.getType( filePath )

        if (imgs.includes( fileType )) {
            sendFile(filePath, req, res)
        } else {
            res.status(416).send({
                success: false,
                mes: '目前暂不支持此格式文件查看！'
            })
        }
    } else if (req.path.startsWith('/v/')) {
        sendFile(getNewPath('video'), req, res)
    } else if (req.path.startsWith('/m/')) {
        sendFile(getNewPath('audio'), req, res)
    } else {
        res.status(404).send({
            success: false,
            mes: '没有发现指定类型文件'
        })
    }
}

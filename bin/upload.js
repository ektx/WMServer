const mime = require('mime')
const multer = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let type = mime.getExtension(file.mimetype)
        let filter = {
            img: ['image/gif', 'image/jpeg', 'image/png'],
            video: ['video/mp4'],
            audio: ['audio/mp3'],
        }
        console.log(file, type, filter, [file.fieldname])

        if (filter[file.fieldname].includes(file.mimetype)) {
            cb(null, `./upload/${file.fieldname}/`)
        } else {
            cb(new Error('I don\'t know what you want!'))
        }
    },
    filename: function (req, file, cb) {
        console.log(null, file)
        cb(null, `${Date.now()}.${mime.getExtension(file.mimetype)}`)
    }
})
let upload = multer({
    storage,
    limits: {
        files: 9
    }
})

/**
 * 文件上传控制
 */
let uploadFields = upload.fields([
    // 图片最多上传 9
    {
        name: 'img',
        maxCount: 9
    },
    // 视频最多上传 1
    {
        name: 'video',
        maxCount: 1
    }
])

exports.uploadCallback = function (req, res) {
    uploadFields(req, res, err => {
        if (err) {
            console.log(err)
            res.status(500).send({
                success: false,
                mes: '出现文件类型错误!'
            })
            return
        }

        let result = {}
    
        if ('img' in req.files) {
            result.img = []
    
            req.files.img.forEach(val => {
                result.img.push(`${val.path.replace('upload', '')}`)
            })
        }
    
        if ('video' in req.files) {
            result.video = req.files.video[0].path.replace('upload/video', '/v')
        }
        
        res.status(200).send(result)
    })
}
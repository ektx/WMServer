
const express = require('express')
const cors = require('cors')
const chalk = require('chalk')
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')

mongoose.Promise = global.Promise

const tokenAuth = require('./bin/tokenAuth')

global.OS_TypeFiles = []

// 环境情况
const serverType = process.argv[2]
const dbURL = 'mongodb://localhost/' + (serverType === 'dev' ? 'workman_t' : 'workman')

// 连接数据库
mongoose.connect(dbURL).then(
  () => {
    console.log(chalk.green('数据库链接完成'))
  },
  err => {
    console.log(chalk.red('数据库链接失败\n'), chalk.yellow(err))
  }
)
mongoose.set('debug', true)

// 引用路由
const router = require('./bin/router')

// 使用服务
const app = express()
const port = 9085

app.use(cors())

// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// 解析 application/json
app.use(bodyParser.json())

// 注意 router 要在 bodyParser 之后调用
// 否则无法取到 req.body
app.use(router)

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(null, file)
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
let upload = multer({ 
  storage,
  limits: {
    files: 9
  }
})
app.post('/upload', upload.fields([
  {
    name: 'img',
    maxCount: 2
  },
  {
    name: 'video',
    maxCount: 1
  },
  {
    name: 'avatar',
    maxCount: 9
  }
]), (req, res, next) => {
  console.log(req.files, req.body)
  res.end('ok')
})

const schema = require('./API/')

// 对外接口
app.use('/api', tokenAuth, graphqlHTTP({
  schema,
  graphiql: true
}))
// 对内测试接口
app.use('/apiTest', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(port, () => {
  console.log(chalk.green(`Server listening on http://localhost:${port} `))
})

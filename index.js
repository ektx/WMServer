
const express = require('express')
const cors = require('cors')
const chalk = require('chalk')
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

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

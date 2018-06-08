
const express = require('express');
const router = express.Router()
const tokenAuth = require('./tokenAuth')
const { uploadFields, uploadCallback } = require('./upload')
const displayFile = require('./displayFile')
const { GetLogin, login } = require('../API/user/routerEvt')
const saveArticle = require('../API/todoList/RESTful/saveArticle')

router.get('/login', GetLogin)
router.get(/img|v|m/i, displayFile)

router.post('/login', login)
router.post('/api/v1/todoEvent/saveArticle', tokenAuth, saveArticle)
router.post('/upload', uploadCallback)


module.exports = router

const express = require('express');
const router = express.Router()
const tokenAuth = require('./tokenAuth')
const { uploadFields, uploadCallback } = require('./upload')
const displayFile = require('./displayFile')
const routerEvt = require('../API/user/routerEvt')
const saveArticle = require('../API/todoList/RESTful/saveArticle')

router.get('/login', routerEvt.GetLogin)
router.get(/img|v|m/i, displayFile)

router.post('/login', routerEvt.login)
router.post('/api/v1/todoEvent/saveArticle', tokenAuth, saveArticle)
router.post('/upload', uploadCallback)


module.exports = router
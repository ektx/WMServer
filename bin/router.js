
const express = require('express');
const router = express.Router()
const tokenAuth = require('./tokenAuth')

const routerEvt = require('../API/user/routerEvt')
const saveArticle = require('../API/todoList/RESTful/saveArticle')

router.get('/login', routerEvt.GetLogin)

router.post('/login', routerEvt.login)
router.post('/api/v1/todoEvent/saveArticle', tokenAuth, saveArticle)


module.exports = router
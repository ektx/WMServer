
const express = require('express');
const router = express.Router()

const routerEvt = require('./routerEvt')
const testWorkFlow = require('./test')

router.get('/login', routerEvt.GetLogin)

router.post('/login', routerEvt.login)
router.post('/test', testWorkFlow)


module.exports = router
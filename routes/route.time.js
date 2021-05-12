const Router = require('express')
const router = new Router()
const Timer = require('../ordertime/timer')

router.post('/Timer', Timer.renderTime)
router.get('/Timer', Timer.writeTime)


module.exports = router
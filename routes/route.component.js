const Router = require('express')
const router = new Router()
const ComponentController = require('../controllers/contr.component')

router.post('/Component', ComponentController.createComponent)
router.get('/Components', ComponentController.getAllComponents)
router.get('/Component/:id', ComponentController.getComponent)
router.put('/Component', ComponentController.updateComponent)
router.delete('/Component/:id', ComponentController.deleteComponent)

module.exports = router
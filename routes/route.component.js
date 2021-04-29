const Router = require('express')
const router = new Router()
const ComponentController = require('../controllers/contr.component')

router.post('/Component', ComponentController.createComponent)
router.get('/Components', ComponentController.getAllComponents)
router.get('/Component', ComponentController.getComponent)
router.put('/Component', ComponentController.updateComponent)
router.get('/Componentdel', ComponentController.deleteComponent)

module.exports = router
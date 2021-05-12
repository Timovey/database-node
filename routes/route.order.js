const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/contr.order')

router.post('/Order', OrderController.createOrder)
router.get('/Orders', OrderController.getAllOrders)
router.get('/Order', OrderController.getOrder)
router.get('/Orderfil', OrderController.getFilterOrders)
router.put('/Order', OrderController.updateOrder)
router.get('/Orderdel', OrderController.deleteOrder)

module.exports = router
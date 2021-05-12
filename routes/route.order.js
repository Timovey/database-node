const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/contr.order')

router.post('/Order', OrderController.createOrder)
router.get('/Orders', OrderController.getAllOrders)
router.get('/Order', OrderController)
router.get('/Orderfil', FoodController.getFilterFoods)
router.put('/Order', FoodController .updateFood)
router.get('/Orderdel', FoodController .deleteFood)

module.exports = router
const Router = require('express')
const router = new Router()
const OrderFoodController = require('../controllers/contr.orderfood')

router.post('/OrderFood', OrderFoodController.createOrderFood)
router.get('/OrderFoods', OrderFoodController.getAllOrderFoods)
router.get('/OrderFood', OrderFoodController.getOrderFood)
router.get('/OrderFooddel', OrderFoodController .deleteOrderFood)

module.exports = router
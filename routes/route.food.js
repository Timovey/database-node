const Router = require('express')
const router = new Router()
const FoodController = require('../controllers/contr.foods')

router.post('/Food', FoodController.createFood)
router.get('/Foods', FoodController.getAllFoods)
router.get('/Food/:name_food', FoodController.getFood)
router.put('/Food', FoodController.updateFood)
router.delete('/Food/:name_food', FoodController.deleteFood)

module.exports = router
const Router = require('express')
const router = new Router()
const FoodController = require('../controllers/contr.food')

router.post('/Food', FoodController.createFood)
router.get('/Foods', FoodController.getAllFoods)
router.get('/Food', FoodController .getFood)
router.get('/Foodfil', FoodController.getFilterFoods)
router.put('/Food', FoodController .updateFood)
router.get('/Fooddel', FoodController .deleteFood)

module.exports = router
const Router = require('express')
const router = new Router()
const SellerController = require('../controllers/contr.sellers')

router.post('/Seller', SellerController.createSeller)
router.get('/Sellers', SellerController.getAllSellers)
router.get('/Seller', SellerController.getSeller)
router.put('/Seller', SellerController.updateSeller)
router.delete('/Seller/:name_food', SellerController.deleteSeller)

module.exports = router
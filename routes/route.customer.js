const Router = require('express')
const router = new Router()
const CustomerController = require('../controllers/contr.customer')

router.post('/Customer', CustomerController.createCustomer)
router.get('/Customers', CustomerController.getAllCustomers)
router.get('/Customer', CustomerController.getCustomer)
router.put('/Customer', CustomerController.updateCustomer)
router.get('/Customerdel', CustomerController.deleteCustomer)

module.exports = router
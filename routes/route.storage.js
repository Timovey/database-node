const Router = require('express')
const router = new Router()
const StorageController = require('../controllers/contr.storage')

router.post('/Storage', StorageController .createStorage)
router.post('/StorageId', StorageController .createStorageById)
router.get('/Storages', StorageController.getAllStorages)
router.get('/Storage', StorageController .getStorage)
router.get('/StorageFil', StorageController .getFilStorage)
router.get('/Storagedelall', StorageController .deleteStorageAll)
router.put('/Storage', StorageController .updateSeller)
router.get('/Storagedel', StorageController.deleteStorage)

module.exports = router
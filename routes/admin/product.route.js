const express = require('express');
const multer  = require('multer')
const storageMulter = require('../../helpers/storageMulter');
const upload = multer({ storage: storageMulter() })
const router = express.Router();

const controller = require('../../controllers/admin/product.controller.js');
const validate = require('../../validates/admin/product.validate.js');

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi-status', controller.changeMultiStatus);

router.delete('/delete/:id', controller.deleteProduct);

router.get('/create', controller.create);

router.post('/create', upload.single('thumbnail'), validate.createProduct, controller.createProduct);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', upload.single('thumbnail'), validate.editProduct, controller.editProduct)

router.get('/detail/:id', controller.detail);

module.exports = router;
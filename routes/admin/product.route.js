const express = require('express');
const multer  = require('multer')
const storageMulter = require('../../helpers/storageMulter');
const upload = multer({ storage: storageMulter() })
const route = express.Router();

const controller = require('../../controllers/admin/product.controller.js');
const validate = require('../../validates/admin/product.validate.js');

route.get('/', controller.index);

route.patch('/change-status/:status/:id', controller.changeStatus);

route.patch('/change-multi-status', controller.changeMultiStatus);

route.delete('/delete/:id', controller.deleteProduct);

route.get('/create', controller.create);

route.post('/create', upload.single('thumbnail'), validate.createProduct, controller.createProduct);

route.get('/edit/:id', controller.edit);

route.patch('/edit/:id', upload.single('thumbnail'), validate.editProduct, controller.editProduct)

route.get('/detail/:id', controller.detail);

module.exports = route;
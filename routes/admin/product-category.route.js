const express = require('express');
const multer  = require('multer')
const storageMulter = require('../../helpers/storageMulter');
const upload = multer({ storage: storageMulter() })
const router = express.Router();

const controller = require('../../controllers/admin/product-category.controller.js');
const validate = require('../../validates/admin/product-category.validate.js');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', upload.single('thumbnail'), validate.createCategory, controller.createCategory);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', upload.single('thumbnail'), validate.editProductCategory, controller.editProductCategory)

module.exports = router

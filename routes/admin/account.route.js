const express = require('express');
const multer  = require('multer')
const storageMulter = require('../../helpers/storageMulter');
const upload = multer({ storage: storageMulter() })
const router = express.Router();

const controller = require('../../controllers/admin/account.controller');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', upload.single('avatar'), controller.createAccount);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', upload.single('avatar'), controller.editAccount);

module.exports = router;
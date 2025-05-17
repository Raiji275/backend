const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const controller = require('../controller/elseltController')

    router.get('/', controller.get);
    router.get('/:id', controller.getOne);
    router.post('/', controller.post);
    router.get('/delete/:id', controller.delete);
    router.get('/edit/:id', controller.edit);
    router.post('/update/:id', controller.update);

module.exports = router;
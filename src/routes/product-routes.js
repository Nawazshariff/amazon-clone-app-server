const router = require('express').Router();
const controller = require('../controllers/product-controller');

router.get('/getProducts',controller.getProducts);

module.exports = router;
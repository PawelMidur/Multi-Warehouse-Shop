'use strict';

var express = require('express');
var router = express.Router();

var productController = require('../api/controller/products.controller');

const controllerHandler = (promise, params) => async (req, res, next) => {
	const boundParams = params ? params(req, res, next) : [];
	try {
		const result = await promise(...boundParams, req.query);
		return res.json( { count: result.length, result: result } || { message: 'OK' });
	} catch (error) {
		console.log('Controller Handler Error :', error );
		return res.status(500) && next(error);
	}
};
const c = controllerHandler;

// Router Define:
router.get('', c( productController.getAll, (req, res, next) => []) );
router.get('/:id', c( productController.getOne, (req, res, next) => [req.params.id,null]) );
router.get('/:id/:att', c( productController.getOne, (req, res, next) => [req.params.id,req.params.att]) );

router.post('/', c( productController.saveProduct, (req, res, next) => [req.body] ));
router.post('/:id', c( productController.saveAttribut, (req, res, next) => [req.params.id, req.params.att, req.body] ));

router.put('/:id', c( productController.updateProduct, (req, res, next) => [req.params.id, req.body] ));
router.put('/:id/:att', c( productController.updateAttribut, (req, res, next) => [req.params.id, req.params.att, req.body] ));

router.delete('/:id', c( productController.deleteProduct, (req, res, next) => [req.params.id] ));
router.delete('/:id/:att', c( productController.deleteAttribut, (req, res, next) => [req.params.id, req.params.att] ));

module.exports = router;
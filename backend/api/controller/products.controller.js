'use strict';

const productServices = require('../services/products.services');

// GET
module.exports.getAll = function ( query ) {
	const getAll = productServices.getAll(query);	
	return getAll;
}

exports.getOne = function ( prod_id, id_att, query ) {
	const getOne = productServices.getOne(prod_id, id_att, query);
	return getOne;
}

// POST
module.exports.saveProduct = async function ( data ) {
	const saveProduct = await productServices.saveProduct(data);
	return saveProduct;
}

// PUT
module.exports.updateProduct = async function ( id, data ) {
	const updateProduct = await productServices.updateProduct(id, data);
	return updateProduct;
}

// DELETE
module.exports.deleteProduct = async function ( id ) {
	const deleteProduct = await productServices.deleteProduct(id);
	return deleteProduct;
}
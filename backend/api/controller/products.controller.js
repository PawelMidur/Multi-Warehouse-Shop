'use strict';

const Product = require('../models/products.model');
const Tax = require('../models/tax.model');
const Currency = require('../models/currency.model');

// GET

/**
* example -> /products?stats=[month,all]&currency=PLN&warehouse=1&tax=23
* @param json query Property form URL :
* 	@param array stats Product statistics per month and/or all 
* 	@param string currency Product currency to show, default PLN
* 	@param int tax Product tax to show, default 23%
* 	@param int warehouse from which id_warehouse, default 1 - main
* @return json products list
*/
module.exports.getAll = async function ( query ) {
	let where = {};

	const currency = Currency.getCurrency( null, query.currency || "PLN" ).then( res => { return res.length ? res[0].id_currency : null; });
	const tax = Tax.getTax( null, query.tax || 23 ).then( res => { return res.length ? res[0].id_tax : null; });

	let stats = {};
	stats.month = query.stats ? query.stats.indexOf("month") : -1;
	stats.all = query.stats ? query.stats.indexOf("all") : -1;

	where.id_warehouse = query.warehouse || 1;

	where.id_currency = await currency;
	where.id_tax = await tax;

	let offset = query.offset || 0;
	let limit = query.limit || 0;

	let res = Product.getProductsList(where, 1, offset, limit, true, stats);

	return res;
}

exports.getOne = function ( prod_id, id_att, query ) {
	//const getOne = productServices.getOne(prod_id, id_att, query);
	//return getOne;
}

// POST
module.exports.saveProduct = async function ( data ) {
	//const saveProduct = await productServices.saveProduct(data);
	//return saveProduct;
}

// PUT
module.exports.updateProduct = async function ( id, data ) {
	//const updateProduct = await productServices.updateProduct(id, data);
	//return updateProduct;
}

// DELETE
module.exports.deleteProduct = async function ( id ) {
	//const deleteProduct = await productServices.deleteProduct(id);
	//return deleteProduct;
}
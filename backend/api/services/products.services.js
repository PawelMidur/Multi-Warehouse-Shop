'use strict';

const Product = require('../models/products.model');
const Tax = require('../models/tax.model');
const Currency = require('../models/currency.model');

/**
* example -> /products?stats=[month,all]&currency=PLN&warehouse=1&tax=23
*
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

	return Product.getProductsList(where, 1, 0, 1333, true, stats);
}

module.exports.getOne = async function ( prod_id, id_att, query ) {
	return new Product(prod_id, id_att).product;
}

module.exports.saveProduct = function ( data ) {

	console.log(data);
	const p = new Product();
	p.product = data;
	console.log(p.product)
	return p.add(p.product, data);

}
'use strict';

const db = require('../../db_knex');

const ObjectModel = require('./object.model');
const Attribute = require('./attribute.model');


class Products extends ObjectModel {

	constructor(id = null, att = null, id_warehouse = null, id_lang = null, id_shop = null) {
		
		this.product = {
			"id_products": null,
			"p_name": null,
			"code": null,
			"p_date_add": "0000-00-00T00:00:00.000Z",
			"p_date_upd": "0000-00-00T00:00:00.000Z",
			"id_products_attribute": null,
			"id_color": null,
			"id_size": null,
			"ean13": null,
			"a_visibility": null,
			"a_date_add": "0000-00-00T00:00:00.000Z",
			"a_date_upd": "0000-00-00T00:00:00.000Z",
			"color": null,
			"hex": null,
			"size": null,
			"id_warehouse": null,
			"quantity": null,
			"statsMonth": null,
			"statsAll": null,
			"cat_name": null,
            "id_categories": null,
            "id_lang": 1,
			"id_price": null,
			"id_currency": null,
			"id_tax": null,
			"purchase_net": null,
			"purchase_gross": null,
			"purchase_type": 1,
			"wholesale_net": null,
			"wholesale_gross": null,
			"wholesale_type": 1,
			"sale_net": null,
			"sale_gross": null,
			"sale_type": 1
		}
		// super();

		// this.products = {
		// 	id_products : null,
		// 	name : null,
		// 	code : null,
		// 	date_upd : (new Date()).toISOString(),
		// 	date_add : id ? null : (new Date()).toISOString(),

		// 	t_price : null,
		// 	t_categories : null,

		// 	t_attribute : null
		// };


		// this.init = ( () => {
		// 	if (this.id) {
		// 		return Promise.all([
		// 			this.getProduct(id),

		// 			this.getProductPrice(id),
		// 			this.getProductCategories(id),
					
		// 			att ? new Attribute(att, id, true, id_warehouse, id_lang, id_shop).attribute : Attribute.getProductAttributeList(id)

		// 		]).then(values => {
		// 			this.products.id_products = values[0][0].id_products;
		// 			this.products.name = values[0][0].name;
		// 			this.products.code = values[0][0].code;
		// 			this.products.date_upd = values[0][0].date_upd;
		// 			this.products.date_add = values[0][0].date_add;

		// 			this.products.t_price = values[1];
		// 			this.products.t_categories = values[2];
		// 			this.products.t_attribute = values[3];
							
		// 			return true;
		// 		}).catch(reason => {
		// 			return reason;
		// 		});
		// 	} else {
		// 		return super.getNull();
		// 	}		
		// })();
	}

	get product() {
		return (async () => {
			try {
				let isInit = await this.init;
				if (isInit != true && isInit != null) {
					throw isInit;
				}

				return super.clean(this.products);
			} catch(e) {
				return super.handleErrors(e);
			}
		})();
	}

	set product(data) {
		this.products.name = data ? data.name : null;
		this.products.code = data ? data.code : null;		
	}

	// ---------------- Function ----------------

	/**
	* Get available product
	* @param int id Product id
	* @return array Product with all details
	*/
	getProduct( id ) {
		let select = ["pw_products.id_products","pw_products.name","code","pw_products.date_add","pw_products.date_upd"];
		let prepare = db("pw_products");
		let where = {
			id_products: id
		}

		prepare = prepare.where(where);

		return prepare.select(select);
	}

	/**
	* Get all available products
	* @param array|json {} where Property Where in SQL
	* @param int id_lang Language id
	* @param int start Start number
	* @param int limit Number of products to return
	* @param boolen with_Attribut With attribute of products to return
	* @return array Products with some details
	*/
	static getProductsList( where = null, id_lang = 1, start = 0, limit = 0, with_Attribut = true, stats = {} ) {
		let select = ["pw_products.id_products","pw_products.name as p_name","code","pw_products.date_add as p_date_add","pw_products.date_upd as p_date_upd"];
		let prepare = db("pw_products");

		where.id_lang = id_lang;

		if (with_Attribut) {
			select.push("pw_products_attribute.id_products_attribute", "pw_products_attribute.id_products", "pw_products_attribute.id_color", "pw_products_attribute.id_size", "ean13", "pw_products_attribute.visibility as a_visibility", "pw_products_attribute.date_add as a_date_add", "pw_products_attribute.date_upd as a_date_upd");
			select.push("pw_color.id_color", "pw_color.name as color", "pw_color.hex");
			select.push("pw_size.id_size", "pw_size.name as size");
			select.push("pw_products_quantity.id_products_attribute", "id_warehouse", "quantity");

			prepare = prepare.leftJoin('pw_products_attribute', 'pw_products.id_products', 'pw_products_attribute.id_products')
							.leftJoin('pw_color', 'pw_products_attribute.id_color', 'pw_color.id_color')
							.leftJoin('pw_size', 'pw_products_attribute.id_size', 'pw_size.id_size')
							.leftJoin('pw_products_quantity', 'pw_products_attribute.id_products_attribute', 'pw_products_quantity.id_products_attribute');

			if (stats.month != -1) {
				select.push("statsMonth");
				/* `LEFT JOIN (
					( SELECT SUM(quantity) as statsMonth, 
							id_products_attribute 
						FROM pw_orders_detail 
						LEFT JOIN pw_orders_shop USING(id_orders_shop) 
					WHERE MONTH(pw_orders_shop.date_add) = MONTH(CURRENT_DATE - INTERVAL 0 MONTH) 
						GROUP BY id_products_attribute) as s1 
					) ON a.id_products_attribute = s1.id_products_attribute` 
				*/
				let subquery = db("pw_orders_detail")
						.select("id_products_attribute")
						.sum("quantity as statsMonth")
						.leftJoin('pw_orders_shop', 'pw_orders_detail.id_orders_shop', 'pw_orders_shop.id_orders_shop')
						.whereRaw("MONTH(`pw_orders_shop`.`date_add`) = MONTH(CURRENT_DATE - INTERVAL 0 MONTH)")
						.groupBy("id_products_attribute").as("s1");

				prepare = prepare.leftJoin( subquery, 's1.id_products_attribute', 'pw_products_attribute.id_products_attribute');
			}
			if (stats.all != -1) {
				select.push("statsAll");
				/* `LEFT JOIN (
					( SELECT SUM(quantity) as statsAll, 
							id_products_attribute 
						FROM pw_orders_detail
						GROUP BY id_products_attribute) as s2 
					) ON a.id_products_attribute = s2.id_products_attribute` 
				*/
				let subquery = db("pw_orders_detail")
						.select("id_products_attribute")
						.sum("quantity as statsAll")
						.groupBy("id_products_attribute").as("s2");

				prepare = prepare.leftJoin( subquery, 's2.id_products_attribute', 'pw_products_attribute.id_products_attribute');
			}
		}

		/**
		 * add to list Categories products
		 */
		select.push("pw_categories_name.name as cat_name", "pw_categories_name.id_categories", "pw_categories_name.id_lang");

		prepare = prepare.leftJoin('pw_products_categories', 'pw_products.id_products', 'pw_products_categories.id_products')
						.leftJoin('pw_categories_name', 'pw_products_categories.id_categories', 'pw_categories_name.id_categories');

		/**
		 * Add to list of products price
		 */
		select.push("pw_price.id_price", "id_currency", "id_tax", "purchase_net", "purchase_gross", "purchase_type", "wholesale_net", "wholesale_gross", "wholesale_type", "sale_net", "sale_gross", "sale_type");
		select.push("pw_products_price.id_price", "pw_products_price.id_products");

		prepare = prepare.leftJoin('pw_products_price', 'pw_products.id_products', 'pw_products_price.id_products')
						.leftJoin('pw_price', 'pw_products_price.id_price', 'pw_price.id_price');

		prepare = prepare.where(where);

		if (limit) {
			prepare = prepare.limit(limit).offset(start);
		}

		let result = prepare.select(select); //console.log(result.toString());
		return result;
	}
	/*
	select 
		`pw_products`.`id_products`, 
		`pw_products`.`name` as `p_name`, 
		`code`, 
        `pw_categories_name`.`name` as `cat_name`,
        `pw_categories_name`.`id_categories`,
        `pw_categories_name`.`id_lang`,
		`pw_products`.`date_add` as `p_date_add`, 
		`pw_products`.`date_upd` as `p_date_upd`, 
		`pw_products_attribute`.`id_products_attribute`, 
		`pw_products_attribute`.`id_products`,
		`pw_products_attribute`.`id_color`, 
		`pw_products_attribute`.`id_size`,
		`ean13`, 
		`pw_products_attribute`.`visibility` as `a_visibility`, 
		`pw_products_attribute`.`date_add` as `a_date_add`, 
		`pw_products_attribute`.`date_upd` as `a_date_upd`, 
		`pw_color`.`id_color`, 
		`pw_color`.`name` as `color`, 
		`pw_color`.`hex`, 
		`pw_size`.`id_size`, 
		`pw_size`.`name` as `size`, 
		`pw_products_quantity`.`id_products_attribute`, 
		`id_warehouse`, 
		`quantity`,
		`pw_price`.`id_price`, 
		`id_currency`, 
		`id_tax`,  
		`purchase_net`,
		`purchase_gross`, 
		`purchase_type`, 
		`wholesale_net`, 
		`wholesale_gross`, 
		`wholesale_type`, 
		`sale_net`, 
		`sale_gross`, 
		`sale_type`, 
		`pw_products_price`.`id_price`, 
		`pw_products_price`.`id_products` 
	from `pw_products` 
	left join `pw_products_attribute` on `pw_products`.`id_products` = `pw_products_attribute`.`id_products` 
    
	left join `pw_color` on `pw_products_attribute`.`id_color` = `pw_color`.`id_color` 
	left join `pw_size` on `pw_products_attribute`.`id_size` = `pw_size`.`id_size` 
	
    left join `pw_products_quantity` on `pw_products_attribute`.`id_products_attribute` = `pw_products_quantity`.`id_products_attribute` 
	
    left join `pw_products_price` on `pw_products`.`id_products` = `pw_products_price`.`id_products` 
	left join `pw_price` on `pw_products_price`.`id_price` = `pw_price`.`id_price` 
    
    left join `pw_products_categories` on `pw_products`.`id_products` = `pw_products_categories`.`id_products` 
    left join `pw_categories_name` on `pw_products_categories`.`id_categories` = `pw_categories_name`.`id_categories` 
    
	where `id_warehouse` = 1 and `id_currency` = 1 and `id_tax` = 1 and `id_lang` = 1 limit 1000
	*/

	getProductPrice(id) {
		let select = ["pw_price.id_price", "id_currency", "id_tax", "purchase_net", "purchase_gross", "purchase_type", "wholesale_net", "wholesale_gross", "wholesale_type", "sale_net", "sale_gross", "sale_type"];
		let prepare = db("pw_price");
		let where = {
			id_products: id
		}

		prepare = prepare.leftJoin('pw_products_price', 'pw_price.id_price', 'pw_products_price.id_price')
		prepare = prepare.where(where);

		return prepare.select(select);
	}

	getProductCategories(id, id_lang = null, id_shop = null) {
		let select = ["pw_products_categories.id_categories", "pw_products_categories.id_products"];
		let prepare = db("pw_products_categories");

		select.push("pw_categories.id_categories", "id_shop", "active", "position", "image", "date_add", "date_upd");
		prepare = prepare.leftJoin('pw_categories', 'pw_products_categories.id_categories', 'pw_categories.id_categories');

		select.push("pw_categories_name.id_categories", "id_lang", "name", "description");
		prepare = prepare.leftJoin('pw_categories_name', 'pw_products_categories.id_categories', 'pw_categories_name.id_categories');

		let where = {
			id_products: id
		}

		if (id_shop) {
			where.id_shop = id_shop;
		}
		if (id_lang) {
			where.id_lang = id_lang;
		}

		prepare = prepare.where(where);
	
		return prepare.select(select);
	}

	add(product, data) {
		// Using trx as a transaction object:
		/*db.transaction(function(trx) {

			var books = [
				{title: 'Canterbury Tales'},
				{title: 'Moby Dick'},
				{title: 'Hamlet'}
			];

			db.insert({name: 'Old Books'}, 'id')
				.into('catalogues')
				.transacting(trx)
				.then(function(ids) {
					return Promise.map(books, function(book) {
						book.catalogue_id = ids[0];

						// Some validation could take place here.

						return db.insert(info).into('books').transacting(trx);
					});
				})
				.then(trx.commit)
				.catch(trx.rollback);
		})
		.then(function(inserts) {
			console.log(inserts.length + ' new books saved.');
		})
		.catch(function(error) {
			// If we get here, that means that neither the 'Old Books' catalogues insert,
			// nor any of the books inserts will have taken place.
			console.error(error);
		});*/

		// Using trx as a transaction object:
		db.transaction(function(trx) {

			db.insert(product, 'id')
				.into('pw_products')
				.transacting(trx)
				.then(function(ids) {
						let a = new Attribute(null, ids);
						console.log(data);
						a.attribute = data;
						a.attribute.then( (res) => { console.log(res) })
						return db.insert(a.attribute, 'id').into('pw_products_attribute').transacting(trx);
				})
				.then(trx.commit)
				.catch(trx.rollback);
		})
		.then(function(inserts) {
			console.log(inserts.length + ' new product saved.');
		})
		.catch(function(error) {
			// If we get here, that means that neither the 'Old Produts' catalogues insert,
			// nor any of the product inserts will have taken place.
			console.error(error);
		});
	}

}

module.exports = Products
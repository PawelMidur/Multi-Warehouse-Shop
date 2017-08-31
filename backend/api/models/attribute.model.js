 'use strict';

const db = require('../../db_knex');

const ObjectModel = require('./object.model');


class Attribute extends ObjectModel {

	constructor(att = null, prod = null, full = true, id_warehouse = null, id_lang = null, id_shop = null) {
		super();

		this.att = att;
		this.full = full;

		this.attribut = {
			id_products_attribute : null, 
			id_products : null, 
			id_color : null, 
				color : null, 
			id_size : null, 
				size : null, 
			ean13 : null, 
			visibility : null, 
			date_add : this.att ? null : (new Date()).toISOString(), 
			date_upd : (new Date()).toISOString(),

				t_images : null,
				t_description : null,
				t_tag : null,
				t_quantity : null
		};

		this.init = ( () => {
			if (this.att) {
				return Promise.all([
					this.getProductAttribute(this.att),
					this.getProductImages(this.att),
					this.getProductDescription(this.att),
					this.getProductTag(this.att),
					this.getProductQuantity(this.att, id_warehouse)

				]).then(values => {
					this.attribut.id_products_attribute = values[0][0].id_products_attribute;
					this.attribut.id_products = values[0][0].id_products;
					this.attribut.id_color = values[0][0].id_color;
					this.attribut.color = values[0][0].color;
					this.attribut.id_size = values[0][0].id_size;
					this.attribut.size = values[0][0].size;
					this.attribut.ean13 = values[0][0].ean13;
					this.attribut.visibility = values[0][0].visibility;
					this.attribut.date_add = values[0][0].date_add;
					this.attribut.date_upd = values[0][0].date_upd;

					this.attribut.t_images = values[1];
					this.attribut.t_description = values[2];
					this.attribut.t_tag = values[3];
					this.attribut.t_quantity = values[4];
					return true;
				}).catch(reason => {
					return reason;
				});
			} else {
				return super.getNull();
			}		
		})();
	}

	get attribute() {
		return (async () => {
			try {
				let isInit = await this.init;
				if (isInit != true && isInit != null) {
					throw isInit;
				}

				return super.clean(this.attribut);
			} catch(e) {
				return super.handleErrors(e);
			}
		})();
	}

	set attribute(data) {
		this.attribut.id_products_attribute = data ? data.id_products_attribute : null, 
		this.attribut.id_products = data ? data.id_products : null, 
		this.attribut.id_color = data ? data.id_color : null, 
		this.attribut.id_size = data ? data.id_size : null, 
		this.attribut.ean13 = data ? data.ean13 : null, 
		this.attribut.visibility = data ? data.visibility : null	
	}

	// ---------------- Function ----------------

	/**
    * Get available products attribute
    *
    * @param int id Attribute product id
    * @return array Attribute Product with all details
    */
	getProductAttribute(att) {
		let select = ["id_products_attribute", "id_products", "pw_products_attribute.id_color", "pw_products_attribute.id_size", "ean13", "visibility", "date_add", "date_upd"];
		let prepare = db("pw_products_attribute");

		select.push("pw_color.id_color", "pw_color.name as color", "hex");
		prepare = prepare.leftJoin('pw_color', 'pw_products_attribute.id_color', 'pw_color.id_color');

		select.push("pw_size.id_size", "pw_size.name as size");
		prepare = prepare.leftJoin('pw_size', 'pw_products_attribute.id_size', 'pw_size.id_size');

		let where = {
			id_products_attribute: att
		}

		prepare = prepare.where(where);

		return prepare.select(select);
	}

	/**
    * Get available all products attribute list
    *
    * @param int id Product id
    * @return array Product List of all attribute
    */
	static getProductAttributeList(prod) {
		let select = ["id_products_attribute", "id_products", "pw_products_attribute.id_color", "pw_products_attribute.id_size", "ean13", "visibility", "date_add", "date_upd"];
		let prepare = db("pw_products_attribute");

		select.push("pw_color.id_color", "pw_color.name as color", "hex");
		prepare = prepare.leftJoin('pw_color', 'pw_products_attribute.id_color', 'pw_color.id_color');

		select.push("pw_size.id_size", "pw_size.name as size");
		prepare = prepare.leftJoin('pw_size', 'pw_products_attribute.id_size', 'pw_size.id_size');

		let where = {
			id_products: prod
		}

		prepare = prepare.where(where);

		return prepare.select(select);
	}

	/**
    * Get available products attribute
    *
    * @param int id Attribute product id
    * @return array Attribute Product with all details
    */
	getProductImages(att) {
		let select = ["pw_products_attribute_images.id_products_attribute", "pw_products_attribute_images.id_images"];
		let prepare = db("pw_products_attribute_images");

		select.push("pw_images.id_images", "image", "dimension", "position");
		prepare = prepare.leftJoin('pw_images', 'pw_products_attribute_images.id_images', 'pw_images.id_images');

		let where = {
			id_products_attribute: att
		}
		prepare = prepare.where(where);

		return prepare.select(select);
	}

	/**
    * Get available products attribute
    *
    * @param int id Attribute product id
    * @return array Attribute Product with all details
    */
	getProductDescription(att) {
		let select = ["id_products_attribute", "id_lang", "name", "link_rewrite", "description", "description_short"];
		let prepare = db("pw_products_description");

		let where = {
			id_products_attribute: att
		}
		prepare = prepare.where(where);

		return prepare.select(select);
	}

	/**
    * Get available products attribute
    *
    * @param int id Attribute product id
    * @return array Attribute Product with all details
    */
	getProductTag(att) {
		let select = ["id_products_attribute", "pw_products_attribute_tag.id_tag"];
		let prepare = db("pw_products_attribute_tag");

		select.push("pw_tag.id_tag", "id_lang", "name");
		prepare = prepare.leftJoin('pw_tag', 'pw_products_attribute_tag.id_tag', 'pw_tag.id_tag');

		let where = {
			id_products_attribute: att
		}
		prepare = prepare.where(where);

		return prepare.select(select);
	}

	/**
    * Get available products attribute
    *
    * @param int id Attribute product id
    * @return array Attribute Product with all details
    */
	getProductQuantity(att, id_warehouse = null) {
		let select = ["id_products_attribute", "id_warehouse", "quantity"];
		let prepare = db("pw_products_quantity");

		let where = {
			id_products_attribute: att
		}

		if (id_warehouse) {
			where.id_warehouse = id_warehouse;
		}

		prepare = prepare.where(where);

		return prepare.select(select);
	}

	/**
    * added products attribute
    *
    * @param int id Attribute product id
    * @return boolen Attribute has been successfully added
    */
	add() {
		let select = ["id_products_attribute", "id_warehouse", "quantity"];
		let prepare = db("pw_products_quantity");

		let where = {
			id_products_attribute: att
		}

		if (id_warehouse) {
			where.id_warehouse = id_warehouse;
		}

		prepare = prepare.where(where);

		return prepare.select(select);
	}

}

module.exports = Attribute
'use strict';

const db = require('../../db_knex');
const ObjectModel = require('./object.model');

const TABLE_NAME = 'pw_tax';

class Tax extends ObjectModel{

	constructor(id = null) {
		super();

		this.taxs = {
			id_tax : id,
			value : null,
			position : null
		};

		if (id) {
			this.init = ( () => {
				return new Promise((resolve, reject) => {
					Tax.getTax(id).then( res => {
						this.taxs.value = res[0].value;
						this.taxs.position = res[0].position;
						resolve(true);
					}).catch(reason => {
						reject(reason);
					});
				});	
			})();
		}

	}

	get tax() {
		return (async () => {
			await this.init;
			return super.clean(this.taxs);
		})();
	}

	set tax(data) {
		this.taxs.value = data ? data.value : null;
		this.taxs.position = data ? data.position : null;		
	}

	// ---------------- Helper function ----------------

	static getTax(id = null, value = null) {
		let bulid = db(TABLE_NAME);
		if (id && value == null) {
			bulid = bulid.where("id_tax", id);
		} else if (id == null && value) {
			bulid = bulid.where('value', value);
		}

		return bulid.select("*");
	}
}

module.exports = Tax
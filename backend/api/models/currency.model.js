'use strict';

const db = require('../../db_knex');
const ObjectModel = require('./object.model');

const TABLE_NAME = 'pw_currency';

class Currency extends ObjectModel{

	constructor(id = null) {
		super();

		this.currencys = {
			id_currency : id, 
			name : null, 
			cash : null, 
			exchange : null
		};

		if (id) {
			this.init = ( () => {
				return new Promise((resolve, reject) => {
					this.getCurrency(id).then( res => {
						this.currencys.name = res[0][0].name;
						this.currencys.cash = res[0][0].cash;
						this.currencys.exchange = res[0][0].exchange;
						resolve(true);
					}).catch(reason => {
						reject(reason);
					});
				});	
			})();
		}

	}

	get currency() {
		return (async () => {
			await this.init;
			return super.clean(this.currencys);
		})();
	}

	set currency(data) {
		this.currencys.name = data ? data.name : null;
		this.currencys.cash = data ? data.cash : null;		
		this.currencys.exchange = data ? data.exchange : null;		
	}

	// ---------------- Helper function ----------------

	static getCurrency(id = null, name = null) {
		let bulid = db(TABLE_NAME);
		if (id && name == null) {
			bulid = bulid.where("id_currency", id);
		} else if (id == null && name) {
			bulid = bulid.where('name', name);
		}

		return bulid.select("*");
	}
}

module.exports = Currency
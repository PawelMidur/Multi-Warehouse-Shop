'use strict';

class ObjectModel{

	constructor() {}

	clean(object) {
		for (var propName in object) {
			if (object[propName] === null || object[propName] === undefined) {
				delete object[propName];
			}
		}
		return object;
	}

	getNull() {
		return new Promise((resolve) => {
			return resolve(null);
		});
	}

	handleErrors(err) {
		return new Promise((resolve, reject) => {
			return reject(err);
		});
	}

	after4Seconds(x) {
		console.log('after4Seconds start...');

		return new Promise(resolve => {
			setTimeout(() => {
				console.log('after4Seconds....')
				resolve(x);
			}, 4000);
		});
	}

}

module.exports = ObjectModel
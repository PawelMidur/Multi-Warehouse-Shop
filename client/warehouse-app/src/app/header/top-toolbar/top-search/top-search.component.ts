import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/startWith';

@Component({
	selector: 'pw-top-search',
	templateUrl: './top-search.component.html',
	styleUrls: ['./top-search.component.css']
})
export class TopSearchComponent {

	optionCtrl: FormControl;
	filteredOptions: Observable<any>;

	options = [
		'Alabama',
		'Alaska',
		'Arizona',
		'Arkansas',
		'California',
		'Colorado',
		'Connecticut',
		'Delaware',
		'Florida',
		'Georgia',
		'Hawaii',
		'Idaho',
		'Illinois',
		'Indiana'
	];

	constructor() {
		this.optionCtrl = new FormControl();
		this.filteredOptions = this.optionCtrl.valueChanges.startWith(null).map((val) => {
			return val ? this.options.filter(option => new RegExp(val, 'gi').test(option))
						: this.options.slice();
		});
	}

}

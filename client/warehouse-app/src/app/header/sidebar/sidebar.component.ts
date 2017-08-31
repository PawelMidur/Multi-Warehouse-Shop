import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'pw-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	private config: any = {
			suppressScrollX: true
		};

	constructor() { }

	ngOnInit() { }

}

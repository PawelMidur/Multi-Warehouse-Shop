import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Routes } from '@angular/router';
import { Observable } from "rxjs";

@Component({
	selector: 'pw-pages',
	templateUrl: './pages.component.html',
	styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit{

	private smallScreen: boolean;

	ngOnInit() {
		this.configureSideNav();
	}

	@ViewChild('sidenav') sidenav;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.configureSideNav()
	}

	configureSideNav() {
		this.smallScreen = window.innerWidth < 960 ? true : false
		if (!this.smallScreen) {
			this.sidenav.mode = "side"
			this.sidenav.opened = true
		} else {
			this.sidenav.mode = 'over'
			this.sidenav.opened = false
		}
	}
	
}
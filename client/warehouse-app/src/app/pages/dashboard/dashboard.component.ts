import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { routerTransition } from '../route.animations'

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'pw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [ routerTransition() ]
})

export class DashboardComponent implements OnInit {

  public dataSource;
  public logError;

  constructor(private http: Http) { }

  ngOnInit() { }

  getProducts() {
    return this.http.get(`http://37.59.125.162:3000/api/products`)
    .subscribe(
      data => this.dataSource = data.json(),
      err => this.logError = err
    );
  }
  
}
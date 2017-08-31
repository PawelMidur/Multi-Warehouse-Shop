import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../route.animations'

@Component({
  selector: 'pw-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [ routerTransition() ]
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

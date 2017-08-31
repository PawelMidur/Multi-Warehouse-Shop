import { Component, OnInit, Input } from '@angular/core';
import { auditTime } from "rxjs/operator/auditTime";
import { MdSnackBar } from "@angular/material";
import { Router } from "@angular/router";

import { AuthService } from "../../auth/auth.service";
import { AuthUser } from "../../auth/auth-user";

@Component({
  selector: 'pw-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit {
  @Input()
  title : string;

  @Input()
  sideNav;

  user: AuthUser;

  constructor(private auth: AuthService,
              public loginValidationBar: MdSnackBar,
              private router: Router) {
    this.user = auth.currentUser();
  }

  logout(){
    this.router.navigate(['/login']).then(() => {
      this.loginValidationBar.open("Zostałeś wylogowany...!", "Ok", {
        duration: 3000,
      });
    });
  }

  toggleMenu(){
    this.sideNav.toggle();
  }

  ngOnInit() {
  }

}

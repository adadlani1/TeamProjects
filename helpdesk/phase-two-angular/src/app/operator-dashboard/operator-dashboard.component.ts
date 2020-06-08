import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {JwtService} from "../_services/jwt.service";

@Component({
  selector: 'app-operator-dashboard',
  templateUrl: './operator-dashboard.component.html',
  styleUrls: ['./operator-dashboard.component.css']
})
export class OperatorDashboardComponent implements OnInit {
  constructor(public router: Router, public jwtService: JwtService) { }

  user = localStorage.getItem('role');
  operatorLoggedIn: boolean;

  ngOnInit() {
    this.operatorLoggedIn = this.checkUserLoggedIn();
  }

  checkUserLoggedIn(){
    return this.jwtService.LoggedIn() && this.user === 'operator';
  }

}

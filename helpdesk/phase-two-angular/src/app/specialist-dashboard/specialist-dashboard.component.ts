import { Component, OnInit } from '@angular/core';
import {JwtService} from '../_services/jwt.service';

@Component({
  selector: 'app-specialist-dashboard',
  templateUrl: './specialist-dashboard.component.html',
  styleUrls: ['./specialist-dashboard.component.css']
})
export class SpecialistDashboardComponent implements OnInit {

  constructor(public jwtService: JwtService) { }

  user = localStorage.getItem('role');
  specialistLoggedIn: boolean;

  ngOnInit() {
    this.specialistLoggedIn = this.checkUserLoggedIn();
  }

  checkUserLoggedIn() {
    return this.jwtService.LoggedIn() && this.user === 'specialist';
  }

}

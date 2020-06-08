import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JwtService} from '../_services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ShowErrorMessage = false;
  private role: string;

  constructor(public router: Router,
              public jwtService: JwtService) {
  }

  ngOnInit() {
    // reset Login Status
    this.jwtService.Logout();
  }

  Validate(loginItem) {
    // gets the token and role, saves both in the localStorage
    this.jwtService.Login(loginItem.U, loginItem.P).subscribe(data => {
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', loginItem.U);
      this.role = localStorage.getItem('role');
      if (this.role) {
        if (this.role === 'operator') {
          this.router.navigate(['/operator-dashboard']);
        } else if (this.role === 'specialist') {
          this.router.navigate(['/', 'specialist-dashboard']);
        } else if (this.role === 'analyst'){
          this.router.navigate(['/analyst']);
        }
      }
    }, error => this.ShowErrorMessage = true);
  }
}

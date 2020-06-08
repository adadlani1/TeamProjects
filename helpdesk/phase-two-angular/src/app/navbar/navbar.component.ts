import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {JwtService} from '../_services/jwt.service';
import {Router} from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class NavbarComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private translate: TranslateService, public jwtService: JwtService, public router: Router, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;

  }

  private user: string;

  ngOnInit() {

  }

  open(content) {
    this.modalService.open(content);
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  logoutUser() {
    if (this.jwtService.LoggedIn()) {
      this.jwtService.Logout();
    }

    this.router.navigateByUrl('');
    this.modalService.dismissAll();
  }

  goToHomepage() {
    this.user = localStorage.getItem('role');
    if (this.jwtService.LoggedIn()) {
      if (this.user === 'operator') {
        return '/operator-dashboard';
      } else if (this.user === 'specialist') {
        return '/specialist-dashboard';
      } else if (this.user === 'analyst') {
          return '/analyst';
        }
    } else {
      return '';
    }
  }
}

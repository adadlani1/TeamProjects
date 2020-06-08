import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-save-confirmation',
  templateUrl: './save-confirmation.component.html',
  styleUrls: ['./save-confirmation.component.css']
})
export class SaveConfirmationComponent implements OnInit {
  user: string;

  constructor(public router: Router, public modal: NgbModal) { }
  @ViewChild('content', {static: false}) modal_content: any;

  ngOnInit() {
  }

  // open modal
  OpenModal() {
    this.modal.open(this.modal_content, {windowClass: 'modal-holder', centered: true});
  }

  // redirects user to home page
  redirectToHomepage() {
    this.user = localStorage.getItem('role');
    if (this.user === 'operator')
      this.router.navigateByUrl('/operator-dashboard');
    if (this.user === 'specialist')
      this.router.navigateByUrl('/specialist-dashboard');
    this.modal.dismissAll();
  }
}

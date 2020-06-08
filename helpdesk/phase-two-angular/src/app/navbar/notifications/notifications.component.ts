import { Component, OnInit } from '@angular/core';
import {NotificationsService} from '../../_services/notifications.service';
import {Router} from "@angular/router";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  private notificationsArr: any;
  public notifications: any;
  private notification: any;

  constructor(public notificationsService: NotificationsService, public router: Router) { }

  ngOnInit() {
    let username = localStorage.getItem('username');
    this.notificationsService.getNotifications(username).subscribe(data => {this.saveNotificationsToALocalVariable(data); });
  }

  saveNotificationsToALocalVariable(data) {
    this.notificationsArr = [data];
    this.notifications = this.notificationsArr[0];
    for (this.notification of this.notifications) {
    }
  }

  getHashOfID(problem_id: any) {
    this.router.navigateByUrl('issue/' + window.btoa('problem_id:' + problem_id));
  }
}

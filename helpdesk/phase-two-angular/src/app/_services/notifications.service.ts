import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notifications_url = 'http://miahelpdesk.tk/php/retrieve-notifications.php';

  constructor(public httpClient: HttpClient) { }

  getNotifications(username) {
    return this.httpClient.post(this.notifications_url, {username});
  }
}

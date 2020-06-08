import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { PushNotificationsService } from 'ng-push';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'phase-two-angular';

  // tslint:disable-next-line:variable-name
  constructor(public translate: TranslateService, private _pushNotifications: PushNotificationsService) {
    this._pushNotifications.requestPermission();
    translate.setDefaultLang('en');
  }

  notify() { // our function to be called on click
    const options = { // set options
      body: 'The truth is, I\'am Iron Man!',
      icon: './assets/noti-image.jpg' // adding an icon
    };
    this._pushNotifications.create('Iron Man', options).subscribe( // creates a notification
      res => console.log(res),
      err => console.log(err)
    );
  }
}

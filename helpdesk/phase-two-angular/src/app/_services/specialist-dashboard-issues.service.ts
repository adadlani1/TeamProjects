import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialistDashboardIssuesService {
  specialist_issues_url = 'http://miahelpdesk.tk/php/specialist-dashboard-issues.php';

  constructor(public httpClient: HttpClient) { }

  getSpecialistIssues(username) {
    return this.httpClient.post(this.specialist_issues_url, {username});
  }
}

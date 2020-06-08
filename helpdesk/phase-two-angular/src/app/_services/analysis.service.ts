import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  analysis_data_URL = 'http://miahelpdesk.tk/php/specific-analyst-data.php';
  analysis_names_URL = 'http://miahelpdesk.tk/php/get-all-specialists.php';
  existing_issues_URL = 'http://miahelpdesk.tk/php/get-unsolved-existing-issues-data.php';
  issues_created_year_URL = 'http://miahelpdesk.tk/php/issues-created-over-year.php';
  calls_per_operator_URL = 'http://miahelpdesk.tk/php/getCallsPerOperator.php';
  all_specialists_info_URL = 'http://miahelpdesk.tk/php/all-specialists-info-for-analyst.php';
  issues_raised_URL = 'http://miahelpdesk.tk/php/getIssuesRaised.php';

  constructor(private httpClient: HttpClient) { }

  GetData(usernames) {
    return this.httpClient.post(this.analysis_data_URL, {usernames});
  }
  GetAnalystNames() {
    return this.httpClient.get(this.analysis_names_URL);
  }
  GetExistingIssues() {
    return this.httpClient.get(this.existing_issues_URL);
  }
  GetIssuesCreated(year) {
    return this.httpClient.post(this.issues_created_year_URL, {year});
  }
  GetCallsPerOperator() {
    return this.httpClient.get(this.calls_per_operator_URL);
  }
  GetAllSpecialistsInfo() {
    return this.httpClient.get(this.all_specialists_info_URL);
  }
  GetIssuesRaised() {
    return this.httpClient.get(this.issues_raised_URL);
  }
}

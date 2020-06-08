import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SimilarIssueService {
  similar_issues_script_url = "http://miahelpdesk.tk/php/similar-issue.php";
  constructor(public http: HttpClient) { }

  GetSimilarIssues(new_issue_data) {
    let body = {
      problem_type: new_issue_data.problem_type,
      device_type: new_issue_data.device_type,
      make: new_issue_data.make,
      model: new_issue_data.model,
      serial: new_issue_data.serial,
      software_name: new_issue_data.software_name,
      software_version: new_issue_data.software_version,
      department: new_issue_data.department
    };

    return this.http.post(this.similar_issues_script_url, body);
  }
}

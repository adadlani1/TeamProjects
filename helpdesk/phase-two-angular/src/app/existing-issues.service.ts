import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExistingIssuesService {

  existing_issues_resource_url = 'http://miahelpdesk.tk/php/existing-issues-data.php';
  specialist_name_resource_url = 'http://miahelpdesk.tk/php/get-specialist-names.php';
  existing_issue_url = 'http://miahelpdesk.tk/php/retrieve-existing-issue-data.php';
  add_note_resource_url = "http://miahelpdesk.tk/php/add-note-to-existing-issue.php";
  refer_specialist_resource_url = "http://miahelpdesk.tk/php/refer-specialist.php";
  provide_solution_resource_url = "http://miahelpdesk.tk/php/provide-solution.php";

  constructor(private http: HttpClient) { }

  getExistingIssuesData(filters = null) {
    return this.http.post(this.existing_issues_resource_url, {filters: filters});
  }

  getExistingIssueData(problem_id) {
    return this.http.post(this.existing_issue_url, {problem_id});
  }

  getSpecialistsData() {
    return this.http.get(this.specialist_name_resource_url);
  }

  addNote(problem_id, note) {
    this.http.post(this.add_note_resource_url, {'problem_id': problem_id, 'note': note});
  }

  referSpecialist($username, $problem_id, $priority) {
    this.http.post(this.refer_specialist_resource_url, {'specialist' : $username, 'problem_id': $problem_id, 'priority': $priority});
  }

  provideSolution($problem_id, $solution, $parent_issue_id, $solution_id) {
    return this.http.post(this.provide_solution_resource_url, {'problem_id': $problem_id, 'solution': $solution, 'parent_issue_id': $parent_issue_id, 'solution_id': $solution_id});
  }
}

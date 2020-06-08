import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { NewIssueService } from '../new-issue.service';
import { AccordionNewIssueComponent } from '../accordion-new-issue/accordion-new-issue.component';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit {
  @ViewChildren('issue_accordion') components:QueryList<AccordionNewIssueComponent>;
  aid = '1';
  issues = ['issue'];
  error;

  constructor(public new_issue_service: NewIssueService) {
  }

  ngOnInit() {
  }

  genID() {
    this.aid = Math.random().toString(36).substring(2);
  }

  appendProblemDesc() {
    return true;
  }

  SubmitIssues() {
    localStorage.removeItem('idSelected');
    let issues = [];
    this.error = false
    // For each issue accordion, retrieve the issue details from the form
    // and add that to the array of issues
    for (const issue_accordion of this.components.toArray()) {
      let issue_details = issue_accordion.GetIssueDetails()
      issues.push(issue_details);
      console.log(issue_details.form_status);
      if (issue_details.form_status == false) {
        return this.error = true;
      }
    }

    
    // Submit issues and print the server response to console for debugging
    let response = this.new_issue_service.SubmitNewIssues(issues);
    response.subscribe(message => console.log(message));
  }

  addIssue() {
    this.issues.push('another one');
  }
}

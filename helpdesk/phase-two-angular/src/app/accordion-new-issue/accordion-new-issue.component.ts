import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueFormComponent } from '../issue-form/issue-form.component';

@Component({
  selector: 'app-accordion-new-issue',
  templateUrl: './accordion-new-issue.component.html',
  styleUrls: ['./accordion-new-issue.component.css']
})
export class AccordionNewIssueComponent implements OnInit {
  @ViewChild('form', {static: false}) form: IssueFormComponent;
  constructor() { }

  ngOnInit() {
  }

  GetIssueDetails() {
    return this.form.GetFormValues();
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {AccordionComponent} from '../accordion/accordion.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-specialist-issue-desc',
  templateUrl: './specialist-issue-desc.component.html',
  styleUrls: ['./specialist-issue-desc.component.css']
})
export class SpecialistIssueDescComponent implements OnInit {
  public currentProblemNotes: string;

  constructor(public accordionComponent: AccordionComponent, public router: Router) { }
  @Input() public problemNotes: string;
  @Input() public problemID: any;


  ngOnInit() {
    this.currentProblemNotes = this.problemNotes;
  }

  // gets the base64 encode of that number and adds to url and loads the issue
  getHashOfNumber(problem_id) {
    this.router.navigateByUrl('specialist-dashboard/issue/' + window.btoa('problem_id:' + problem_id));
  }
}

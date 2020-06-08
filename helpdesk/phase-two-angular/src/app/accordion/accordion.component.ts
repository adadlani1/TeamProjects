import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SpecialistDashboardIssuesService} from '../_services/specialist-dashboard-issues.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionComponent implements OnInit {


  constructor(public router: Router, public specialistDashboardService: SpecialistDashboardIssuesService) { }
  public problemID: any;
  public problemNotes: string;
  private username: string;
  issues = '';
  private issuesArr: any[];

  // function that saves the notes in a global variable so it can be loaded in another component
  // tslint:disable-next-line:variable-name
  panelOpenState = false;

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.specialistDashboardService.getSpecialistIssues(this.username).subscribe(data => {this.saveDataInArray(data); });
  }

  private saveDataInArray(data) {
    this.issuesArr = [data];
    this.issues = this.issuesArr[0];
  }
}

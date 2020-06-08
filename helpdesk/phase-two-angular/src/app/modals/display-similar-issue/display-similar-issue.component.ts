import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExistingIssuesService} from "../../existing-issues.service";

@Component({
  selector: 'app-display-similar-issue',
  templateUrl: './display-similar-issue.component.html',
  styleUrls: ['./display-similar-issue.component.css']
})
export class DisplaySimilarIssueComponent implements OnInit {

  @Input() problemID;
  @ViewChild('content', {static: false}) modal_content: any;
  problem: any;
  notesToAppend = '';

  constructor(public modalService: NgbModal, private existingIssuesService: ExistingIssuesService) { }

  ngOnInit() {
  }

  OpenModal() {
    localStorage.setItem('idSelected', this.problemID);
    this.GetSelectedIssueData();
    this.modalService.open(this.modal_content);
  }

  GetSelectedIssueData() {
    this.existingIssuesService.getExistingIssueData(this.problemID).subscribe(data => this.SaveDataInVariable(data));
  //  keep status, problem_type, description, software_name, software_version, device_type, notes - note, time_created
  }

  SaveDataInVariable(data) {
    this.problem = data;
    this.DisplayNotesOfExistingIssue();
  }

  DisplayNotesOfExistingIssue() {
    for (let i = 0; i < this.problem.notes.length; i++) {
      this.notesToAppend += this.problem.notes[i].note + ' - Time Created: ' + this.problem.notes[i].time_created + '\n';
    }
  }
}

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { SimilarIssueService } from '../../similar-issue.service';

@Component({
  selector: 'app-similar-issue',
  templateUrl: './similar-issue.component.html',
  styleUrls: ['./similar-issue.component.css'],
  providers: [NgbModalConfig, NgbModal]

})
export class SimilarIssueComponent implements OnInit {
  @Input() new_issue_data;
  @ViewChild('content', {static: false}) modal_content: any; // TO-DO: Should be something like modal_content: TemplateRef instead of 'any'

  data = [];
  idSelected = '';

  constructor(public modalService: NgbModal, public similar_issue_service: SimilarIssueService) { }

  ngOnInit() {
    // Get similar issues data based new issue form input.
  }

  OpenModal() {
    this.modalService.open(this.modal_content);
    this.similar_issue_service.GetSimilarIssues(this.new_issue_data).subscribe(data => this.SaveDataToVariable(data));
  }

  SaveDataToVariable(data) {
    this.data = data;
  }
}

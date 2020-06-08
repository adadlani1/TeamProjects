import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'problem-solved-modal',
  templateUrl: './problem-solved.component.html',
  styleUrls: ['./problem-solved.component.css']
})
export class ProblemSolvedComponent implements OnInit {

  constructor(public modal: NgbModal) { }
  @Output() solutionEvent = new EventEmitter<any>();
  @ViewChild('content', {static: false}) modal_content: any;

  ngOnInit() {
  }

  OpenModal() {
    this.modal.open(this.modal_content, {windowClass: 'modal-holder', centered: true});
  }

  // TO-DO: Use a service to save the solution to the database
  SaveSolution(solution) {
    this.solutionEvent.emit(solution);
    this.modal.dismissAll();
  }
}

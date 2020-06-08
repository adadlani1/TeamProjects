import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecialistReferralService } from '../../specialist-referral.service';

@Component({
  selector: 'app-specialist-referral',
  templateUrl: './specialist-referral.component.html',
  styleUrls: ['./specialist-referral.component.css']
})
export class SpecialistReferralComponent {

  constructor(public modal_service: NgbModal, public specialist_referral_serivce: SpecialistReferralService) {}
  @Output() referral_made = new EventEmitter<any>(); // TO-DO: Change 'any' to something more specific
  @ViewChild('content', {static: false}) modal_content: any; // TO-DO: Should be something like modal_content: TemplateRef instead of 'any'

  no_specialist_selected;
  selected_specialist;
  priority;
  specialists_to_show;
  all_specialists;

  ngOnInit() {
    // Retrieve specialist data from database.
    this.all_specialists = this.specialist_referral_serivce.getSpecialistsData().subscribe(data => this.specialists_to_show = data);
    this.specialists_to_show = this.all_specialists;
  }

  OpenModal() {
    this.LoadDefaultValues();
    this.modal_service.open(this.modal_content, {windowClass: 'modal-holder', centered: true, scrollable: true});
  }

  LoadDefaultValues() {
    this.selected_specialist = undefined;
    this.no_specialist_selected = true;
    this.priority = '3'; // Default priority '3' is 'Normal'
  }

  OnSpecialistSelect(username_of_selected) {
    this.selected_specialist = username_of_selected;
    this.no_specialist_selected = false;
  }

  EmitEventWithResultAndCloseModal() {
    // Pack data and emit event
    let result = {name : this.selected_specialist, priority: this.priority};
    this.referral_made.emit(result);

    // Close modal
    this.modal_service.dismissAll();
  }
}

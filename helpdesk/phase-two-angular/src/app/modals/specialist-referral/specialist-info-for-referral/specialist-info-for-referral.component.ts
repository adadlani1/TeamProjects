import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-specialist-info-for-referral',
  templateUrl: './specialist-info-for-referral.component.html',
  styleUrls: ['./specialist-info-for-referral.component.css']
})
export class SpecialistInfoForReferralComponent implements OnInit {
  @Input() specialist_info : any  //TO-DO: Give this a more specific type than 'any'
  @Output() specialist_select = new EventEmitter();

  show_tasks = false
  has_low_work_load = false
  has_medium_work_load = false
  has_high_work_load = false

  ngOnInit() {
    this.DetermineWorkLoad()
  }
  
  DetermineWorkLoad() {
    var job_count = this.specialist_info.num_of_jobs

    if (job_count <= 3)
      this.has_low_work_load = true
    else if (job_count <= 5)
      this.has_medium_work_load = true
    else
      this.has_high_work_load = true
  } 

  ShowJobs() {
    this.show_tasks = !this.show_tasks
  }
}

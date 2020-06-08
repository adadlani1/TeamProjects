import {Component, ViewChild} from '@angular/core';
import {ExistingIssuesService} from '../existing-issues.service';
import {Router} from "@angular/router";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NewIssueService } from '../new-issue.service';
import { DatePipe } from '@angular/common';
import { MatDatepicker } from '@angular/material';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-existing-issues',
  templateUrl: './existing-issues.component.html',
  styleUrls: ['./existing-issues.component.css']
})

export class ExistingIssuesComponent {
  public  existing_issues: IssueView[];
  dataSource = new MatTableDataSource<IssueView>(this.existing_issues);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatDatepicker, {static: false}) datepicker: MatDatepicker<Date>;
  displayedColumns: string[] = ['caller_name', 'job_title', 'department', 'problem_id', 
  'problem_type','description','specialist_name','time_created', 'status'];
  
  issueForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  employeeNames;
  allSpecialist;
  problemTypes;
  dropdownData;

  constructor(private existingIssuesService: ExistingIssuesService, public router: Router,
     private fb: FormBuilder, private newIssueService: NewIssueService, private datePipe: DatePipe) {
    //Could query the DB to get the first ever issue for min date.
    //Used for the range of dates the user can input using the calendar
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date();
  }

  //initialisng the table and input fields
  ngOnInit() {
    this.existingIssuesService.getExistingIssuesData().subscribe(
      data => {
        this.existing_issues = data as IssueView[];
        this.dataSource.data = data as IssueView[];
        this.dataSource.paginator = this.paginator;
      });

    //retrieving employee names for dropdown
    this.newIssueService.GetEmployeeNames()
    .subscribe(emp => {
      this.employeeNames = emp;
      this.dropdownData = emp;
    });

    this.issueForm = this.fb.group({ 
      input:['', Validators.required],
      problem_type:['', Validators.required],
      start:[{value: ''}, Validators.pattern('^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$')],
      end:[{value: ''}, Validators.pattern('^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$')],
      status:['open'],
      option:['No Filter', Validators.required],
      operator: ['']
    })

    //retrieving specialist names for dropdown
    this.existingIssuesService.getSpecialistsData()
    .subscribe(sp => {
      this.allSpecialist = sp;
    });

    //retrieving problem types for dropdown
    this.newIssueService.GetProblemTypes()
    .subscribe(pt => {
      this.problemTypes = pt;
      this.issueForm.controls.problem_type.setValue(pt[0]);
    })

    this.issueForm = this.fb.group({
      input:['', Validators.required],
      problem_type:['', Validators.required],
      date1:[''],
      date2:[''],
      status:['open'],
      option:['No Filter', Validators.required],
      operator: ['']
    })
  }

  getHashOfNumber(problem_id: number) {
    console.log(problem_id);
    this.router.navigateByUrl('/operator-dashboard/existing-issue/issues/' + window.btoa('problem_id:' + problem_id));
  }

  getServerData(){
    this.existingIssuesService.getExistingIssuesData().subscribe(
      data => {
        this.existing_issues = data as IssueView[];
        this.dataSource.data = data as IssueView[];
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  //sorts the table based on the selected table column
  sortTable(sort: Sort) {
    const data = this.existing_issues.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'caller_name': return this.compare(a.caller_name, b.caller_name, isAsc);
        case 'job_title': return this.compare(a.job_title, b.job_title, isAsc);
        case 'department': return this.compare(a.department, b.department, isAsc);
        case 'problem_id': return this.compare( parseInt(a.problem_id), parseInt(b.problem_id), isAsc);
        case 'problem_type': return this.compare(a.problem_type, b.problem_type, isAsc);
        case 'specialist_name': return this.compare(a.specialist_name, b.specialist_name, isAsc);
        case 'time_created': return this.compare(a.time_created, b.time_created, isAsc);
        default: return 0;
      }
    });
  }

  //compares 2 values for sorting
  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  //selects the dropdown data based on the option selected
  changeDropdownData(option) {

    switch(option) {
      case "Name": {
        this.dropdownData = this.employeeNames;
        break;
      }
      case "Problem Type": {
        this.dropdownData = this.problemTypes;
        break;
      }
      case "Specialist": {
        this.dropdownData = this.allSpecialist;
        console.log(this.allSpecialist);
        break;
      }
      case "Problem ID": {
        this.dropdownData = [''];
        break;
      }
    }

  }

  // Gather filters when search button is pressed, and get existing issues
  // with those filters applied
  onSubmit(form) {
    let filters;
    switch(form.option) {
      case "Name": {
        filters = {caller_name: form.input}
        break;
      }
      case "Problem ID": {
        filters = {problem_id: form.input}
        break;
      }
      case "Problem Type": {
        filters = {problem_type: form.problem_type}
        break;
      }
      case "Specialist": {
        filters = {specialist_name: form.input}
        break;
      }
      case "Date": {
        filters = {
          dates: {
            start: this.convertDateFormat(form.start, this.issueForm.controls.start),
            end: this.convertDateFormat(form.end, this.issueForm.controls.end)
          }
        }
        break;
      }
      case "Status": {
        filters = {status: form.status}
        break;
      }
    }
    this.GetExistingIssues(filters);
  }

  //gets relevant records in the database based on given inputs and updates the table
  GetExistingIssues(filters) {
    this.existingIssuesService.getExistingIssuesData(filters)
    .subscribe(result => {
      this.existing_issues = result as IssueView[];
      this.dataSource.data = result as IssueView[];
      this.dataSource.paginator = this.paginator;
    });
  }

  //converts a date to unix timestamp
  convertDateFormat(date, formControl) {
    if (formControl === null || formControl === undefined) {
      return null;
    }

    return new Date(date).getTime() / 1000;
  }
}

export interface IssueView {
  problem_id;
  problem_type;
  description;
  caller_name;
  department;
  job_title;
  specialist_name;
  status;
  time_created;
}

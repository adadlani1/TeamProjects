import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {softwareAndHardware, hardwareValidation, softwareVersionValidation, versionValidation, serialValidation} from './validation';
import {NewIssueService} from '../new-issue.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ExistingIssuesService} from '../existing-issues.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit {
  form: FormGroup;
  employeeNames;
  employeeData;
  hardwareTypeData;
  hardwareMakeData;
  hardwareModelData;
  hardwareSerialData;
  softwareTypeData;
  softwareVersions;
  problemTypeData;
  referralEvent;
  status;
  time_created;
  operator_name;
  issue_is_solved;

  public new_issue_data;

  currentExistingID: number;

  issueDetails;
  private issue: any;

  constructor(private fb: FormBuilder,
              private newIssueService: NewIssueService,
              public router: Router,
              public route: ActivatedRoute,
              private existingIssuesService: ExistingIssuesService
  ) {}

  ngOnInit() {
    this.new_issue_data = [''];
    // retrieving data to be used in dropdowns
    this.newIssueService.GetEmployeeNames()
      .subscribe(emp => {
        this.employeeNames = emp;
      });

    this.newIssueService.GetHardwareTypes()
      .subscribe(dt => {
        this.hardwareTypeData = dt;
      });

    this.newIssueService.GetSoftwareTypes()
      .subscribe(st => {
        this.softwareTypeData = st;
      });

    // Input fields and validation used for the form.
    this.form = this.fb.group({
      caller: ['', Validators.compose([
        Validators.required
      ])],
      caller_id: [''],
      jobTitle: [''],
      telephoneC: [''],
      dept: [''],
      software_name: ['',Validators.compose([ 
        softwareAndHardware, softwareVersionValidation 
      ])],
      version: ['', versionValidation],
      software_id: [''],
      deviceType: ['',Validators.compose([
        softwareAndHardware, hardwareValidation 
      ])],
      makeC: [''],
      modelC: [''],
      serial: ['', serialValidation],
      description: ['', Validators.compose([
        Validators.required
      ])],
      note: [''],
      prevNotes: [''],
      specialist: [''],
      status: ['open'],
      problem_type: ['', Validators.compose([
        Validators.required
      ])],
      priority: [''],
      solution: [''],
      form_status: [false],
      parentID: ['']
    });

    if (this.router.url !== '/operator-dashboard/new-issue') {
      this.getProblemID();
      this.GetExistingIssueInformation();
      this.existingIssue();
    } else {
      this.issue_is_solved = false;
    }

    this.disableFields();

    this.form.controls.problem_type.valueChanges.subscribe(
      (event) => { this.updateFormValue()});
    this.form.controls.description.valueChanges.subscribe(
      (event) => { this.updateFormValue()});

    //Checks if user input is within the given options in the dropdown, when another field is updated
    this.form.controls.caller.valueChanges.subscribe(
      (event) => {
        if (this.employeeNames !== undefined && this.employeeNames !== []) {
          const formControlValue = this.form.controls.caller.value;
          const array = this.convertObjectToArray(this.employeeNames);

          // if input exist set errors to null.
          if ( array.find(x => x == formControlValue) === formControlValue ) {
            this.form.controls.caller.setErrors(null);
            this.fillData(formControlValue);
          } 
          //setting fields to empty if invalid caller name is entered
          else {
              this.form.controls.jobTitle.setValue("");
              this.form.controls.telephoneC.setValue("");
              this.form.controls.dept.setValue("");
              this.form.controls.caller.setErrors({ doesNotExist: true });

          }
        }
      this.updateFormValue();
      }
    );

    this.form.controls.software_name.valueChanges.subscribe(
      (event) => {
        if ( (this.softwareTypeData !== undefined) && (this.softwareTypeData !== []) ) {
          let softwareControl = this.form.controls.software_name;
          let formControlValue = softwareControl.value;
          let array = this.convertObjectToArray(this.softwareTypeData);

          //if software name is an empty string do nothing
          if (formControlValue === "") {
          }
          //if software exist set error to null
          else if ( array.find(x => x == formControlValue) === formControlValue ) {
            if (softwareControl.errors != null) {
              if (softwareControl.errors.hasOwnProperty('doesNotExist')) {
                softwareControl.setErrors(null);
              }
            }
            this.form.controls.version.enable();
          } 
          //else it does not exist set error
          else {
            this.form.controls.software_name.setErrors({ doesNotExist: true});
            this.form.controls.version.disable();
          }
        }
        this.updateFormValue();
      }
    );

    this.form.controls.version.valueChanges.subscribe(
      (event) => {
        if (this.softwareVersions !== undefined && this.softwareVersions !== []) {
          let versionControl = this.form.controls.version
          let formControlValue = versionControl.value;
          let array = this.convertObjectToArray(this.softwareVersions, "version");
          
          //Some software do not have versions which is set to n/a therefore set error to null
          if (formControlValue.toLowerCase() == 'n/a') {
            if (array.length === 0) {
              versionControl.setErrors(null);
            }
            else {
              versionControl.setErrors({ required: true});
            }
          }
          //if version exist set errors to null
          else if ( array.find(x => x == formControlValue) === formControlValue ) {
            versionControl.setErrors(null);
          }
          //if version is empty set to null
          else if (formControlValue == "") {
            if (versionControl.errors != null) {
              if (versionControl.errors.hasOwnProperty('doesNotExist')) {
                versionControl.setErrors(null);
              }
            }
          }
          //else set error
          else {
            versionControl.setErrors({ doesNotExist: true});
          }
        }
        this.updateFormValue();

      }
    );

    this.form.controls.deviceType.valueChanges.subscribe(
      (event) => {
        if (this.hardwareTypeData !== undefined && this.hardwareTypeData !== []) {
          let deviceControl = this.form.controls.deviceType;
          let formControlValue = deviceControl.value;
          let array = this.convertObjectToArray(this.hardwareTypeData);
          this.form.controls.serial.setValue("");

          //if hardware name is an empty string reset model and make fields
          if (formControlValue === "") {
            this.makeFieldReset();
            this.modelFieldReset();
          }

          //if hardware exist set error to null
          else if ( array.find(x => x == formControlValue) === formControlValue ) {
            if (deviceControl.errors != null) {
              if (deviceControl.errors.hasOwnProperty('doesNotExist')) {
                deviceControl.setErrors(null);
              }
            }
            this.form.controls.makeC.enable();
          }
          //else set error
          else {
            deviceControl.setErrors({ doesNotExist: true});
            this.makeFieldReset();
            this.modelFieldReset();
          }
        }
        this.updateFormValue();
      }
    );

    this.form.controls.makeC.valueChanges.subscribe(
      (event) => {
        if (this.hardwareMakeData !== undefined && this.hardwareMakeData !== []) {
          let makeControl = this.form.controls.makeC;
          let formControlValue = makeControl.value;
          let array = this.convertObjectToArray(this.hardwareMakeData);
          this.form.controls.serial.setValue("");

          //if make field is empty set error to null
          if (formControlValue === "") {
            this.form.controls.makeC.setErrors(null);
          }
          //if make exists set error to null
          else if ( array.find(x => x == formControlValue) === formControlValue ) {
            if (makeControl.errors != null) {
              if (makeControl.errors.hasOwnProperty('doesNotExist')) {
                makeControl.setErrors(null);
              }
            }
            this.form.controls.modelC.enable();
          }
          //else set error
          else {
            makeControl.setErrors({ doesNotExist: true});
            this.modelFieldReset();
          }
        }
        this.updateFormValue();
      }
    );

    this.form.controls.modelC.valueChanges.subscribe(
      (event) => {
        if (this.hardwareModelData !== undefined && this.hardwareModelData !== []) {
          let modelControl = this.form.controls.modelC;
          let formControlValue = modelControl.value;
          let array = this.convertObjectToArray(this.hardwareModelData);
          this.form.controls.serial.setValue("");
          
          //if model field is empty set error to null
          if (formControlValue === "") {
            modelControl.setErrors(null);
          }
          //if make exists set error to null
          else if ( array.find(x => x == formControlValue) === formControlValue ) {
            if (modelControl.errors != null) {
              if (modelControl.errors.hasOwnProperty('doesNotExist')) {
                modelControl.setErrors(null);
              }
            }
            modelControl.setErrors(null);
          }
          //else set error
          else {
            modelControl.setErrors({ doesNotExist: true});
          }
        }
        this.updateFormValue();
      }
    );

    this.form.controls.serial.valueChanges.subscribe(
      (event) => {
        if (this.hardwareSerialData !== undefined && this.hardwareSerialData !== []) {
          let serialControl = this.form.controls.serial;
          let formControlValue = serialControl.value;
          let array = this.convertObjectToArray(this.hardwareSerialData);

          //if serial field is empty set error to null
          if (formControlValue === "") {
            serialControl.setErrors(null);
          }
          
          //if serial exists set error to null
          else if ( array.find(x => x == formControlValue) === formControlValue ) {
            if (serialControl.errors != null) {
              if (serialControl.errors.hasOwnProperty('doesNotExist')) {
                serialControl.setErrors(null);
              }
            }
          }
          //else set error
          else {
            serialControl.setErrors({ doesNotExist: true});
          }
        }
        this.updateFormValue();
      }
    );

  }

  onSubmit(issue) {
  }

 
  GetFormValues() {
    const new_issue_data = this.form.value;

    // Attach operator's username to the issue data before submitting it
    const operator_username = localStorage.username;
    new_issue_data.operator_username = operator_username;

    // TEMP. GET THIS DATA FROM SIMILAR_ISSUES_MODAL
    new_issue_data.parent_issue_id = '';
    new_issue_data.solution_id = '';

    return new_issue_data;
  }

  // fills job, telephone, dept fields depending on a valid input
  fillData(caller) {
    this.newIssueService.RetrieveCallerDetails(caller).subscribe(emp => {
      if (emp[0] != null) {
        this.form.controls.jobTitle.setValue(emp[0].job_title);
        this.form.controls.telephoneC.setValue(emp[0].telephone +
          '\t\t\t\t\t\t\text: ' + emp[0].extension_no);
        this.form.controls.dept.setValue(emp[0].department);
        this.form.controls.caller_id.setValue(emp[0].emp_id);
      }

    });
  }

  // retrives version for the selected version
  getVersions(name: string) {
    this.newIssueService.RetrieveVersion(name)
    .subscribe(sv => {
      this.softwareVersions = sv;
    } );
  }

  // retrives make for the selected hardware information
  getHardwareMakes(hardwareName: string) {
    this.newIssueService.RetrieveMake(hardwareName)
    .subscribe(sm => {
      this.hardwareMakeData = sm;
    } );
    // As serial is a mandatory field but dependent on previous, serials based on the current
    // information is retrieved
    this.getHardwareSerials(hardwareName, '', '');
  }

  // retrieves model for the selected hardware information
  getHardwareModels(hardwareName: string, make: string) {
    this.newIssueService.RetrieveModel(hardwareName, make)
    .subscribe(sv => {
      this.hardwareModelData = sv;
    } );

    this.getHardwareSerials(hardwareName, make, '');
  }

  // retrives serial for the selected hardware information
  getHardwareSerials(hardwareName: string, make: string, model: string) {
    this.newIssueService.RetrieveSerial(hardwareName, make, model)
    .subscribe(ss => {
      this.hardwareSerialData = ss;
    } );
  }

  // disables selected fields
  disableFields() {
    this.form.controls.version.disable();
    this.form.controls.makeC.disable();
    this.form.controls.modelC.disable();
  }

  // resets and disables make field
  makeFieldReset() {
    this.form.controls.makeC.disable();
    this.form.controls.makeC.setValue('');
  }

  // resets and disables modelC field
  modelFieldReset() {
    this.form.controls.modelC.disable();
    this.form.controls.modelC.setValue('');
  }

  existingIssue() {
    this.form.disable();
    this.form.controls.note.enable();
    this.updateFields();
  }

   updateFields() {
     this.form.controls.caller.setValue(this.issueDetails.caller_name);
     this.form.controls.jobTitle.setValue(this.issueDetails.job_title);
     this.form.controls.telephoneC.setValue(this.issueDetails.caller_telephone);
     this.form.controls.dept.setValue(this.issueDetails.department);
     this.form.controls.software_name.setValue(this.issueDetails.software_name);
     this.form.controls.version.setValue(this.issueDetails.software_version);
     this.form.controls.deviceType.setValue(this.issueDetails.device_type);
     this.form.controls.makeC.setValue(this.issueDetails.make);
     this.form.controls.modelC.setValue(this.issueDetails.model);
     this.form.controls.serial.setValue(this.issueDetails.serial);
     this.form.controls.description.setValue(this.issueDetails.description);
     this.status = this.issueDetails.status;
     this.time_created = this.issueDetails.time_created;
     this.operator_name = this.issueDetails.operator_name;
     let notesToAddToPrevNotes = '';
     for (let i = 0; i < this.issueDetails.notes.length; i++) {
       notesToAddToPrevNotes += this.issueDetails.notes[i].note + '- Time Created: ' + this.issueDetails.notes[i].time_created + '\n';
     }
     this.form.controls.prevNotes.setValue(notesToAddToPrevNotes);
   }

  // converts an object into an array
  convertObjectToArray(data, key?) {
    if (key != undefined) {
      const result = [];

      for (const record of data ) {
        if (record.version === null) {continue; }
        result.push(record.version);
      }
      return result;
    }
    const arrTemp = [data];
    return arrTemp[0];
  }

  // sets values within the form once a specialist is selected
  getReferral(event) {
    this.form.controls.specialist.setValue(event.name);
    this.form.controls.priority.setValue(event.priority);
    this.form.controls.status.setValue('referred');

    // If in an existing issue page, refer specialist straight after 'refer' button is pressed in modal
    if (this.router.url !== '/operator-dashboard/new-issue') {
      this.existingIssuesService.referSpecialist(event.name, this.currentExistingID, event.priority);
    }
  }
  

  // sets values within the form once a solution is provided
  getSolution(event) {
    this.form.controls.solution.setValue(event);
    this.form.controls.status.setValue('solved');
    this.form.controls.specialist.setValue('');

    // If in an existing issue page, provide solution to issue straight after 'Save Changes' button is pressed
    if (this.router.url !== '/operator-dashboard/new-issue') {
      this.existingIssuesService.provideSolution(this.currentExistingID, event, null, null).subscribe(x => {
        // When finished updating the database, update the page to reflect the change
        this.GetExistingIssueInformation();
      });
    }
  }

  // sets problem type once selected
  getProblemType(event) {
    this.form.controls.problem_type.setValue(event);
  }

  // sets the version ID in the form once an input is selected
  setVersionID(version) {
    for (const record of this.softwareVersions) {
      if (record.version === null ) {continue; }
      if (record.version.toLowerCase() === version.toLowerCase() ) {
        this.form.controls.software_id.setValue(record.id);
        return;
      }
    }
    this.form.controls.software_id.setValue('');
  }

  updateFormValue(){
    this.form.controls.form_status.setValue(this.form.valid);
  }

  AddNote() {
    const note = this.form.controls.note.value;
    const problem_id = this.currentExistingID;
    this.existingIssuesService.addNote(problem_id, note);
    // this.form.controls.prevNotes.reset();
    this.GetExistingIssueInformation();
  }

  // gets the existing issue information depending on the issue clicked
  GetExistingIssueInformation() {
    this.existingIssuesService.getExistingIssueData(this.currentExistingID).subscribe(data => this.saveDataInVariable(data));
  }

  // saves data in a variable and updates the form
  saveDataInVariable(data) {
    this.issueDetails = data;
    this.updateFields();
  }

  // gets problem ID from url
  getProblemID() {
    const urlSplit = this.router.url.split('/');
    const problemID = urlSplit[urlSplit.length - 1];
    const decoded = window.atob(problemID);
    const decodedSplit = decoded.split(':');
    this.currentExistingID = Number(decodedSplit[decodedSplit.length - 1]);
  }

  shouldShowReferralButton() {
    let role = localStorage.getItem('role');

    if (this.status == 'solved') {
      return false;
    }

    if (this.status == "referred" && role == "operator") {
      return false;
    }

    return true;
  }

  shouldShowSolutionButton() {
    if (this.status == 'solved') {
      return false;
    } else {
      return true;
    }
  }

  // add the filled variables so can be used to identify similar issues
  AppendFilledValuesToVariable() {
    this.new_issue_data = [];
    if (this.form.controls.deviceType.value !== null) {
      this.new_issue_data.device_type = this.form.controls.deviceType.value;
    }
    if (this.form.controls.problem_type.value !== null) {
      this.new_issue_data.problem_type = this.form.controls.problem_type.value;
    }
    if (this.form.controls.dept.value !== null) {
      this.new_issue_data.department = this.form.controls.dept.value;
    }
    if (this.form.controls.makeC.value !== null) {
      this.new_issue_data.make = this.form.controls.makeC.value;
    }
    if (this.form.controls.modelC.value !== null) {
      this.new_issue_data.model = this.form.controls.modelC.value;
    }
    if (this.form.controls.serial.value !== null) {
      this.new_issue_data.serial = this.form.controls.serial.value;
    }
    if (this.form.controls.software_name.value !== null) {
      this.new_issue_data.software_name = this.form.controls.software_name.value;
    }
    if (this.form.controls.version.value !== null) {
      this.new_issue_data.software_version = this.form.controls.version.value;
    }

    console.log(this.new_issue_data);
  }

  addSimilarIssueDataToForm() {
    this.form.controls.parentID.setValue(localStorage.getItem('idSelected'));
    localStorage.removeItem('idSelected');
  }
}

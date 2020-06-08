import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewIssueService {
  caller_names_resource_url = "http://miahelpdesk.tk/php/get-caller-names.php";
  hardware_and_software_resource_url = "http://miahelpdesk.tk/php/hardware-and-software-data.php";
  retrieve_caller_details_resource_url = "http://miahelpdesk.tk/php/retrieve-caller-details.php";
  hardware_type_resource_url = "http://miahelpdesk.tk/php/get-hardware-type.php";
  software_type_resource_url = "http://miahelpdesk.tk/php/get-software-type.php";
  software_version_resource_url = "http://miahelpdesk.tk/php/retrieve-software-version.php";
  hardware_make_resource_url = "http://miahelpdesk.tk/php/retrieve-hardware-make.php";
  hardware_model_resource_url = "http://miahelpdesk.tk/php/retrieve-hardware-model.php";
  hardware_serial_resource_url = "http://miahelpdesk.tk/php/retrieve-hardware-serial.php";
  submit_new_issue_resource_url = "http://miahelpdesk.tk/php/submit-new-issues.php";
  problem_type_tree_resource_url = "http://miahelpdesk.tk/php/get-problem-type-tree.php";
  problem_types_resource_url = "http://miahelpdesk.tk/php/get-problem-types.php";



  constructor(public http: HttpClient) { }

  GetEmployeeNames() {
    return this.http.get(this.caller_names_resource_url)
  }

  GetHardwareAndSoftwareDetails() {
    return this.http.get(this.hardware_and_software_resource_url)
  }

  RetrieveCallerDetails(caller_name) {
    return this.http.post(this.retrieve_caller_details_resource_url, {'caller_name': caller_name});
  }

  GetHardwareTypes() {
    return this.http.get(this.hardware_type_resource_url);
  }
  
  GetSoftwareTypes() {
    return this.http.get(this.software_type_resource_url);
  }

  RetrieveVersion(softwareName: string) {
    return this.http.post(this.software_version_resource_url, {'softwareName': softwareName});
  }

  RetrieveMake(hardwareName: string) {
    return this.http.post(this.hardware_make_resource_url, {'hardwareName': hardwareName});
  }

  RetrieveModel(hardwareName: string, make: string) {
    return this.http.post(this.hardware_model_resource_url, {'hardwareName': hardwareName, 'make': make});
  }

  RetrieveSerial(hardwareName: string, make: string, model:string) {
    return this.http.post(this.hardware_serial_resource_url, {'hardwareName': hardwareName, 'make': make, 'model': model});
  }

  SubmitNewIssues(issues) {
    return this.http.post(this.submit_new_issue_resource_url, {'issues': issues});
  }

  GetProblemTypesTree() {
    return this.http.get(this.problem_type_tree_resource_url);
  }

  GetProblemTypes() {
    return this.http.get(this.problem_types_resource_url);
  }
}

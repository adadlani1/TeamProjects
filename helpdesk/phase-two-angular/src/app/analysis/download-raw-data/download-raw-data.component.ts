import {Component, OnInit} from '@angular/core';
import {AppService} from '../../_services/app.service';
import {AnalysisService} from '../../_services/analysis.service';

@Component({
  selector: 'app-download-raw-data',
  templateUrl: './download-raw-data.component.html',
  styleUrls: ['./download-raw-data.component.css']
})
export class DownloadRawDataComponent implements OnInit {
  jsonData = [];
  selectedOption: string;
  // headerlists that are going to be the column headings of the csv file
  operatorCallsHeaderList = ['name', 'Number of calls'];
  specialistInfoHeaderList = ['username', 'currently_assigned', 'solved', 'referred'];
  issuesCreatedHeaderList = ['problem_id', 'Time Created'];

  constructor(private appService: AppService, private analysisService: AnalysisService) {
  }

  ngOnInit() {
  }

  // directs the option selected to the appropriate function
  DownloadCSVFile() {
    if (this.selectedOption === 'calls-per-operator') {
      this.GetCallsPerOperator();
    } else if (this.selectedOption === 'specialist-data') {
      this.GetSpecialistsData();
    } else if (this.selectedOption === 'issues-raised') {
      this.GetIssuesRaised();
    }
  }

  // saves data to a local variable
  OverwriteDataToJSONVariable(data) {
    this.jsonData = data;
  }

  // gets the data for calls per operator
  GetCallsPerOperator() {
    this.analysisService.GetCallsPerOperator().subscribe(data => {
      this.OverwriteDataToJSONVariable(data);
      this.appService.DownloadFile(this.jsonData, this.selectedOption, this.operatorCallsHeaderList);
    });
  }

  // gets the specialist data
  GetSpecialistsData() {
    this.analysisService.GetAllSpecialistsInfo().subscribe(data => {
      this.OverwriteDataToJSONVariable(data);
      this.appService.DownloadFile(this.jsonData, this.selectedOption, this.specialistInfoHeaderList);
    });
  }

  // gets the issues raised data
  GetIssuesRaised() {
    this.analysisService.GetIssuesRaised().subscribe(data => {
      this.OverwriteDataToJSONVariable(data);
      this.appService.DownloadFile(this.jsonData, this.selectedOption, this.issuesCreatedHeaderList);
    });
  }
}

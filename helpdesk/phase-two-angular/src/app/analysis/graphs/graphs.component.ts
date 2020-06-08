import {Component, OnInit} from '@angular/core';
import {AnalysisService} from '../../_services/analysis.service';
import {FormGroup} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  private specialistInformation: any;

  constructor(public analysisService: AnalysisService) {
  }

  solved = 0;
  activeTasks = 0;
  rereferred = 0;
  specialistNames;

  chartOptions = {
    responsive: true
  };
  selectedNames = [];
  chartData = [
    {data: [], label: []},
    {data: [], label: []},
    {data: [], label: []}
  ];

  chartLabels = [];
  form: FormGroup;
  showChart = false;

  ngOnInit() {
    this.analysisService.GetAnalystNames().subscribe(data => {
      this.SaveNamesInVariable(data);
    });
    this.chartData[0].label = ['Solved'];
    this.chartData[1].label = ['Active Tasks'];
    this.chartData[2].label = ['Referred'];
  }

  GetInfoForEachSpecialist(specialists) {
    this.chartData[0].data = [];
    this.chartData[1].data = [];
    this.chartData[2].data = [];

    this.GetSpecialistData(specialists);
  }

  SaveNamesInVariable(data) {
    this.specialistNames = data;
  }

  toggle($event: MatCheckboxChange, specialistName: string) {
    this.showChart = false;
    this.CheckIfCheckBoxTicked($event, specialistName);
  }

  CheckIfCheckBoxTicked($event, specialistName) {
    if ($event.checked) {
      this.selectedNames.push(specialistName);
    } else if (!$event.checked) {
      if (this.selectedNames.includes(specialistName)) {
        this.selectedNames = this.selectedNames.filter(nameToRemove => nameToRemove !== specialistName);
      }
    }
  }

  GenerateGraphs() {
    if (this.selectedNames !== []) {
      this.CapitaliseNames();
      this.chartLabels = this.selectedNames;
      this.GetInfoForEachSpecialist(this.selectedNames);
    }
  }

  private GetSpecialistData(specialists) {
    this.analysisService.GetData(specialists).subscribe(data => this.SaveAllInformationInData(data));
  }

  private SaveAllInformationInData(data) {
    this.specialistInformation = data;
    this.AppendDataToGraphs(this.specialistInformation);
  }

  private AppendDataToGraphs(listOfSpecialistsAndInformation) {
    for (const specialist of this.selectedNames) {
      const specialistInfo =  listOfSpecialistsAndInformation[specialist];
      let appendDataToGraphs;
      if (this.solved) {
        appendDataToGraphs = specialistInfo.solved.length;
        this.chartData[0].data.push(appendDataToGraphs);
      }
      if (this.activeTasks) {
        appendDataToGraphs = specialistInfo.currently_assigned.length;
        this.chartData[1].data.push(appendDataToGraphs);
      }
      if (this.rereferred) {
        appendDataToGraphs = specialistInfo.referred.length;
        this.chartData[2].data.push(appendDataToGraphs);
      }
      this.showChart = true;
    }
  }

  private CapitaliseNames() {
    for (let i = 0 ; i < this.selectedNames.length ; i++) {
      this.selectedNames[i] = this.selectedNames[i] = this.selectedNames[i].charAt(0).toUpperCase() + this.selectedNames[i].substr(1);
    }
  }
}


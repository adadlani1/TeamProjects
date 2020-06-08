import {Component, OnInit} from '@angular/core';
import {AnalysisService} from '../../_services/analysis.service';
import {Label} from 'ng2-charts';
import {ChartType} from 'chart.js';

@Component({
  selector: 'app-graphs-overall',
  templateUrl: './graphs-overall.component.html',
  styleUrls: ['./graphs-overall.component.css']
})
export class GraphsOverallComponent implements OnInit {

  // initialising of variables for the doughnut graph
  chartOptions = {
    responsive: true
  };
  public doughnutChartLabels: Label[] = ['Referred', 'Open'];
  public doughnutChartData = [0, 0];
  public doughnutChartType: ChartType = 'doughnut';

  // counter for the number of issues that have been referred and are open
  referred = 0;
  open = 0;

  // boolean values to show or hide the graphs
  referredAndOpenSelected = false;
  lineGraphForIssues = false;
  private existingIssues: any;
  years: any[];

  public lineChartData = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: ''},
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
  selectedYear = '';
  showGraph = false;
  showGraphDoughnut = false;

  constructor(public analysisService: AnalysisService) {
  }

  ngOnInit() {
    this.GetAllYears();
  }

  // button press leads to this function
  // depending on the check boxes ticked, the graph is shown
  GenerateGraphs() {
    this.ResetData();
    if (this.referredAndOpenSelected) {
      this.DisplayReferredAndOpenChart();
    }
    if (this.lineGraphForIssues) {
      this.GetIssuesCreatedData();
    }
  }

  // gets the doughnut charts information
  DisplayReferredAndOpenChart() {
    this.analysisService.GetExistingIssues().subscribe(data => this.SaveIssuesInVariable(data));

  }

  // saves the loaded data from database to a local variable
  SaveIssuesInVariable(data) {
    this.existingIssues = data;
    this.GatherNumbers();
  }

  // gets count of the number of issues that are referred and open
  GatherNumbers() {
    for (const issue of this.existingIssues) {
      if (issue.status === 'referred') {
        this.referred++;
      } else if (issue.status === 'open') {
        this.open++;
      }
    }
    this.doughnutChartData.push(this.referred);
    this.doughnutChartData.push(this.open);
    this.showGraphDoughnut = true;

  }

  // gets data for issues created in the specific year selected
  GetIssuesCreatedData() {
    this.lineChartData[0].label = this.selectedYear;
    this.analysisService.GetIssuesCreated(this.selectedYear).subscribe(data => this.AppendDataToLineGraph(data));
  }

  // produces all years from 2000 to 2020
  private GetAllYears() {
    this.years = [];
    for (let i = 0; i < 21; i++) {
      this.years[i] = 2000 + i;
    }
  }

  // add data to the line graph
  private AppendDataToLineGraph(data) {
    for (const entry of data) {
      const monthCreatedNumber = Number(entry.month_created);
      this.lineChartData[0].data[monthCreatedNumber - 1] = Number(entry.count);
    }
    this.showGraph = true;
  }

  // set all data to initial so new data can be added
  private ResetData() {
    this.open = 0;
    this.referred = 0;
    this.doughnutChartData = [];
    this.lineChartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.showGraphDoughnut = false;
    this.showGraph = false;
  }
}

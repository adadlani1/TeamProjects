import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-individual-analysis',
  templateUrl: './individual-analysis.component.html',
  styleUrls: ['./individual-analysis.component.css']
})


export class IndividualAnalysisComponent implements OnInit {


  public IssueStatus = ['Solved','Pending','Referred'];
  public issueData = [{data:[8,3,1],backgroundColor:['green','yellow','red']}];
  public chart = 'doughnut'
  public options = {
    title: {
      display: true,
      text: `Bert - Average solving time: 30s`
    },
    legend: {
      display: true
    },
  }
  public plugins = [{
    beforeDraw: function ({ chart }) {
      const totalIssues = 8 + 1 + 3
      const percentageOfIssuesSolved = Math.round(800 / totalIssues)
      const width = chart.width
      const height = chart.height
      const context = chart.ctx;
      context.restore();
      const font = Math.round(((height + width) / 500)).toString();
      context.font = font + "rem sans-serif";
      context.textBaseline = "middle";
      const text = `${percentageOfIssuesSolved}%`
      const textX = Math.round((width - context.measureText(text).width) / 2)
      const textY = height / 1.8
      context.fillText(text, textX, textY)
      context.fillStyle = 'green'
      context.save()
    }
  }]
  constructor() { }

  ngOnInit() {
  }

}

// https://www.youtube.com/watch?v=BALaj39rbZE
import {Component, OnInit} from '@angular/core';
import { TREE_OPTION, TREE_DATA_1} from './tree-option';

@Component({
  selector: 'app-problem-type-tree',
  templateUrl: './problem-type-tree.component.html',
  styleUrls: ['./problem-type-tree.component.css']
})
export class ProblemTypeTreeComponent implements OnInit {
  options = TREE_OPTION;
  mergeData = null;
  optionClicked: any;
  public selectedValue: string;
  public splitArr: string[];

  constructor() {
  }

  ngOnInit() {
    TREE_OPTION.series[0].data = [TREE_DATA_1];

    this.mergeData = {
      series: TREE_OPTION.series
    };
  }

  onValueSelected(event: any) {
    this.selectedValue = event.path[3].textContent;
    this.splitSelected();
    console.log(event.path[3].textContent);
  }

  splitSelected() {
    this.splitArr = this.selectedValue.split('.');
    console.log(this.splitArr);
    this.optionClicked = this.splitArr.join(' > ');
  }
}


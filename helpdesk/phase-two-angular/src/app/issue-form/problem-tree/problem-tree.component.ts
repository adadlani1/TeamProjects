import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { NewIssueService } from '../../new-issue.service';
import {TitleCasePipe} from '@angular/common';

interface IssueNode {
  type: string;
  children?: IssueNode[];
}

@Component({
  selector: 'problem-tree-cp',
  templateUrl: './problem-tree.component.html',
  styleUrls: ['./problem-tree.component.css']
})
export class ProblemTreeComponent implements OnInit {
  @Output() problemTypeEvent = new EventEmitter<string>();
  treeControl = new NestedTreeControl<IssueNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<IssueNode>();
  nodeClicked: string;

  tree: IssueNode[] = [
    { type: 'Problem Type',
      children: []
    }
  ];

  constructor(private newIssueService: NewIssueService) {
   }

  ngOnInit() {
    //retrieves all problem types and their childrens, used to generate the tree
    this.newIssueService.GetProblemTypesTree()
    .subscribe( ptt => {
      this.tree[0].children = ptt as IssueNode[];
      this.dataSource.data = this.tree;
    });
  }

  //checks if the current node has children
  hasChild = (_: number, node: IssueNode) => !!node.children && node.children.length > 0;

  //gets the value of the selected node
  getValue(node: string) {
    if (node === "Problem Type") {
      return;
    }
    this.problemTypeEvent.emit(node);
    this.nodeClicked = node;
  }

}

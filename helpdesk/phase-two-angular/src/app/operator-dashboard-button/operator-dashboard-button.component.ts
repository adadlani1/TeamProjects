import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-operator-dashboard-button',
  templateUrl: './operator-dashboard-button.component.html',
  styleUrls: ['./operator-dashboard-button.component.css']
})
export class OperatorDashboardButtonComponent {
  @Input() img : string;
  @Output() click = new EventEmitter<MouseEvent>();

  onClickButton(event) {
    this.click.emit(event)
  }
}

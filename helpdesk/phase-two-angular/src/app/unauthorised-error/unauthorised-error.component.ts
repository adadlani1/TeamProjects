import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-unauthorised-error',
  templateUrl: './unauthorised-error.component.html',
  styleUrls: ['./unauthorised-error.component.css']
})
export class UnauthorisedErrorComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}

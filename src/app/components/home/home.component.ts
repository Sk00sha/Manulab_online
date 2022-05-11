import { Component, OnInit } from '@angular/core';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {faCalculator} from '@fortawesome/free-solid-svg-icons';
import {faTextWidth}from '@fortawesome/free-solid-svg-icons';
import {faChartArea}from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //icons
  faInfo=faInfo;
  faCalculator=faCalculator;
  faTextWidth=faTextWidth;
  faChartarea=faChartArea;
  constructor() { }

  ngOnInit(): void {
  }

}

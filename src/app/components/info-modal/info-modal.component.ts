import { Component, OnInit } from '@angular/core';
import {faCalculator} from '@fortawesome/free-solid-svg-icons';
import {faTextWidth}from '@fortawesome/free-solid-svg-icons';
import {faChartArea}from '@fortawesome/free-solid-svg-icons';
import {faInfo}from '@fortawesome/free-solid-svg-icons';
import {faTimes}from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {
  showModal:boolean=true;
  faCalculator=faCalculator;
  faTextWidth=faTextWidth;
  faChartarea=faChartArea;
faInfo=faInfo;
faTimes=faTimes;
  constructor() { }

  ngOnInit(): void {
  }
  

}

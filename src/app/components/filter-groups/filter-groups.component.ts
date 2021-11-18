import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import {faCalculator} from '@fortawesome/free-solid-svg-icons';
import {faTextWidth}from '@fortawesome/free-solid-svg-icons';
import {faChartArea}from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter-groups',
  templateUrl: './filter-groups.component.html',
  styleUrls: ['./filter-groups.component.scss']
})
export class FilterGroupsComponent implements OnInit {
  faCalculator=faCalculator;
  faTextWidth=faTextWidth;
  faChartarea=faChartArea;

  constructor(private exchange:DataExchangeService) { }
  local_filters:string[]=[];
  @Output() messageEvent=new EventEmitter<string[]>()
  filter_groups=[
    {value:'Statistics',id:1,icon:this.faCalculator},
    {value:'Text operations',id:2,icon:this.faTextWidth},
    {value:'Cryptanalysis',id:3,icon:this.faChartarea}
  ]
  selectedDay:number;
  ngOnInit(): void {
  }
  radioChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;
    this.exchange.exchangeList(this.selectedDay);
    this.local_filters=this.exchange.available_filters;
    this.messageEvent.emit(this.local_filters);
  }

}

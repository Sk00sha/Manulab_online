import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-groups',
  templateUrl: './filter-groups.component.html',
  styleUrls: ['./filter-groups.component.scss']
})
export class FilterGroupsComponent implements OnInit {

  constructor() { }
  filter_groups=[
    'Filter one',
    'Filter two',
    'Filter three'
  ]
  selectedDay:string="";
  ngOnInit(): void {
  }
  radioChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;
    console.log(this.selectedDay);
    
  }

}

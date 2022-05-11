import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { DataloaderService } from 'src/app/services/dataloader.service';
import {faCalculator} from '@fortawesome/free-solid-svg-icons';
import {faTextWidth}from '@fortawesome/free-solid-svg-icons';
import {faChartArea}from '@fortawesome/free-solid-svg-icons';
import {faFile}from '@fortawesome/free-solid-svg-icons';
import {faFileDownload}from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {faArrowDown}from '@fortawesome/free-solid-svg-icons';
import { reduceTicks } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-filter-groups',
  templateUrl: './filter-groups.component.html',
  styleUrls: ['./filter-groups.component.scss']
})
export class FilterGroupsComponent implements OnInit {
  //icons
  faCalculator=faCalculator;
  faTextWidth=faTextWidth;
  faChartarea=faChartArea;
  faFile=faFile;
  faFileDownload=faFileDownload;
  color = 'red';
  faArrowDown=faArrowDown;
  previous_target:any=[];
  constructor(private exchange:DataExchangeService,private loader:DataloaderService,private sanitizer: DomSanitizer) { }
  local_filters:string[]=[];
  //parent => child & child => parent communication variables
  @Output() messageEvent=new EventEmitter<string[]>()
  @Output() emit_applied_filter=new EventEmitter<string[]>()
  @Input() get_applied:any[];

  filter_groups=[
    {value:'Statistics',id:1,icon:this.faCalculator},
    {value:'Text operations',id:2,icon:this.faTextWidth},
    {value:'Cryptanalysis',id:3,icon:this.faChartarea}
  ]
  selectedDay:number;
  filter_data:string="";
  downloadJsonHref:SafeUrl;
  filters_export:any[]=[];
  ngOnInit(): void {
  }
  applied_filters(element:string){
    this.filters_export.push(element);
  }
  submit() {
    this.color = 'blue';  
  }

  click(event:any){
    
    if(this.previous_target.length==0){
      event.target.style="border-color:red;"
      this.previous_target.push(event.target);
    }
    else{
      this.previous_target[0].style="border-color:none;";
      event.target.style="border-color:red;"
      this.previous_target[0]=event.target;
      
    }
   
  }
  //download filters in JSON format
  download_filter():void{
  //appending to export applied filters
  this.get_applied.forEach(element=>this.applied_filters(element));
    var theJSON = JSON.stringify(this.filters_export);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    //in HTML we reffer to this uri to get our JSON
    this.downloadJsonHref=uri;
    this.filters_export=[];
  }
  radioChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;
    this.exchange.exchangeList(this.selectedDay);
    this.local_filters=this.exchange.available_filters;
    this.messageEvent.emit(this.local_filters);
    
  }
  searcheChangeHandler(event:any){
    //this function handles searchbar

    this.filter_data = event.target.value;
    var data=this.exchange.filter_from_data(this.filter_data);
    //emiting from child=>parent
    this.messageEvent.emit(data);
    if(this.previous_target.length>0){
      this.previous_target[0].style="border-color:none;";
      this.previous_target=[];
    }
    
  }
  //load JSON file that saved holds filter data
  selectfile(event:any) {
    const f = event.target.files[0];
    const reader = new FileReader();

    reader.onload = ((theFile) => {
      return (e:any) => {
        try {
          const json = JSON.parse(e.target.result);
          const resSTR = JSON.stringify(json);
          
          
          var cUser = JSON.parse(resSTR);
          var return_array:string[]=[];
         
          cUser.forEach(function(e:any){
            return_array.push(e);
          })
          this.emit_applied_filter.emit(return_array);
          this.exchange.applied_filters_array=return_array;
        } catch (ex) {
          alert('exception when trying to parse json = ' + ex);
        }
      };
    })(f);
    reader.readAsText(f);
  }

}

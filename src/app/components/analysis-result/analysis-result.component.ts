import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { CsvDataServiceService } from 'src/app/services/csv-data-service.service';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.scss']
})
export class AnalysisResultComponent implements OnInit {

  constructor(private exchange:DataExchangeService,private csv_creator:CsvDataServiceService) { }
  saleData:any = [];
  result_data=[];
  page_name:string="Page1";
  url: string = 'assets/images/Noitems.png';
  display_results:any[]=[];
  display_result_keys:any;
  results:any[]=[];
  all_data:any[]=[];
  filtering_data:any[]=[];
  residual_results:any[];
  ngOnInit(): void {
    this.display_results=this.exchange.analysis_results;
    if (this.display_results.length>0){
    this.filtering_data=this.get_list_data(this.display_results[0]);
    this.print();
  console.log(this.display_results);
    }
    this.display_result_keys=[];
    this.all_data=[];
    for (const key in this.display_results) {
      this.display_results[key].forEach((element:any) => {
        this.display_result_keys.push(element);
      });
    }
    
  }
  click(indice:number){
    console.log(indice);
    
  }
  print(){
    var filtered:any = [];
    var graph_data:any=[];
    this.display_results[0].forEach((object:any)=>{
      if(object.Page==this.page_name){
          filtered.push(object);
      }
    })
    console.log(filtered.length);
    if(filtered[0].name=="Entropy"){
      filtered.forEach((element:any)=>{
        graph_data.push({ name: element.Page, value: element.Entropy });
      })
     
      this.saleData.push(graph_data);
    }
    if(filtered[0].name=="Frequency of text"){
      filtered.forEach((element:any)=>{
        graph_data.push({ name: element.element, value: element.frequency });
      })
     
      this.saleData.push(graph_data);
    }
    
   }

  Export_data(indice:number):void{
    this.csv_creator.constructCSV(this.display_results[indice]);
  
  }
  get_list_data(data:any){
    var result=data.map((a:any)=>a.Page);
   var final=[... new Set(result)];
   return final;
  }


}
 
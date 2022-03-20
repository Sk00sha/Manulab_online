import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { CsvDataServiceService } from 'src/app/services/csv-data-service.service';
import * as data  from '../../graphSettings.json';
import {faFileDownload}from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.scss']
})
export class AnalysisResultComponent implements OnInit {

  constructor(private exchange:DataExchangeService,private csv_creator:CsvDataServiceService) { }
  graph_settings:any=(data as any).default;
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
  fafiledownload=faFileDownload;
  ngOnInit(): void {
    this.display_results=this.exchange.analysis_results;
   // var data:any=(,data.display_resuts,data.graph_settings)
    if (this.display_results.length>0){
     
    this.filtering_data=this.get_list_data(this.display_results[0]);
    this.init_worker();
    }    
    this.display_result_keys=[];
    this.all_data=[];
    for (const key in this.display_results) {
      this.display_results[key].forEach((element:any) => {
        this.display_result_keys.push(element);
      });
    }
    
  }
  init_worker(){    
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.saleData=data.response;
      };
      //(data.page,data.display_resuts,data.graph_settings)
      worker.postMessage({page:"Page1",display_results:this.display_results,graph_settings:this.graph_settings});
    } else {
      console.log("YES");
      this.init_graph();
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
  redo_graph(indice:number){
    
    var filtered:any[]=[];
    var temp= this.display_results[indice].filter((el:any)=>{
         return el.Page==this.page_name;
     });
   filtered.push(temp);
    var temp_array:any[]=[];
    filtered[0].forEach((array_data:any)=>{
           var res=this.graph_settings.filter((data:any)=>{
                 return data.name==array_data.name;
           })
           temp_array.push({ name: array_data[res[0].x], value: array_data[res[0].y] });
      
       this.saleData[indice]=temp_array;
    });
  }
  
   init_graph(page:string="Page1"){
     var filtered:any[]=[];
     this.display_results.forEach((data:any)=>{
     var temp= data.filter((el:any)=>{
          return el.Page==page;
      });
    filtered.push(temp);
     });
     filtered.forEach((arrays:any)=>{
       var temp_array:any[]=[];
        arrays.forEach((array_data:any)=>{
          
            var res=this.graph_settings.filter((data:any)=>{
                  return data.name==array_data.name;
            })
           
            temp_array.push({ name: array_data[res[0].x], value: array_data[res[0].y] });
        });
        this.saleData.push(temp_array);
     });
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
 
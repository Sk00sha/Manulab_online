import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { CsvDataServiceService } from 'src/app/services/csv-data-service.service';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.scss']
})
export class AnalysisResultComponent implements OnInit {

  constructor(private exchange:DataExchangeService,private csv_creator:CsvDataServiceService) { }
  url: string = 'assets/images/Noitems.png';
  display_results:any[]=[];
  display_result_keys:any;
  results:any[]=[];
  all_data:any[]=[];
  filtering_data:any[]=[];
  residual_results:any[];
  ngOnInit(): void {
    this.display_results=this.exchange.analysis_results;
    this.filtering_data=this.get_list_data(this.display_results[0]);
    this.display_result_keys=[];
    this.all_data=[];
    for (const key in this.display_results) {
      this.display_results[key].forEach((element:any) => {
        this.display_result_keys.push(element);
      });
      
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
 
import { Component, OnInit } from '@angular/core';
import { DataExchangeService } from 'src/app/services/data-exchange.service';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.scss']
})
export class AnalysisResultComponent implements OnInit {

  constructor(private exchange:DataExchangeService) { }
  display_results:any[]=[];
  display_result_keys:any;
  results:any[]=[];
  all_data:any[]=[];
  residual_results:any[];
  ngOnInit(): void {
    this.display_results=this.exchange.analysis_results;
    this.display_result_keys=[];
    this.all_data=[];
    for (const key in this.display_results) {
      console.log(key);
      this.display_results[key].forEach((element:any) => {
        this.display_result_keys.push(element);
      });
      
    }
  /*
    this.display_results.forEach(element => {
      var pages=Object.keys(element);
      pages.forEach((page)=>{
        if(element[page] instanceof Object==false){
          console.log(element[page]);
          this.results.push(element[page]);
        }
        else{
        this.residual_results=Object.values(element[page]); 
        this.residual_results.forEach(element =>{
          const values:string[] = Object.values(element);
          const keys=Object.keys(element);
         
          var data:any=keys.concat(values);

          this.results.push(data);
       
        })
      }
      });
        
       
    });*/
    
  }

}

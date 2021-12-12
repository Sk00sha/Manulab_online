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
  ngOnInit(): void {
    this.display_results=this.exchange.analysis_results;
    this.display_result_keys=this.display_results.keys();
    console.log("Iterating");
  
    this.display_results.forEach(element => {
      var pages=Object.keys(element);
      pages.forEach((page)=>{
        console.log(element[page]);
      });
        
       
    });
    
  }

}

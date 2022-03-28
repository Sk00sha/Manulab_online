import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { CsvDataServiceService } from 'src/app/services/csv-data-service.service';
import * as data  from '../../graphSettings.json';
import {faFileDownload}from '@fortawesome/free-solid-svg-icons';
import {Sort} from '@angular/material/sort';
@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.scss']
})
export class AnalysisResultComponent implements OnInit {

  constructor(private exchange:DataExchangeService,private csv_creator:CsvDataServiceService) { }
  graph_settings:any=(data as any).default;
  ready:boolean=false;
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
   //icons
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
  ngAfterViewInit(){
    setTimeout(()=>{
      this.ready=true;
    },0) 
  }
  //SORTING STARTS
  sortData(sort: Sort,i:number) {
      this.display_results[i] = this.display_results[i].sort((a:any, b:any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Page':
          return this.compare(a.Page,b.Page,isAsc);
          case 'Entropy':
            return this.compare(a.Entropy,b.Entropy,isAsc);
            case 'frequency':
              return this.compare(a.frequency,b.frequency,isAsc);
              case 'element':
              return this.compare(a.element,b.element,isAsc);
              case 'min':
              return this.compare(a.min,b.min,isAsc);
              case 'max':
                return this.compare(a.max,b.max,isAsc);
                case 'avg':
                  return this.compare(a.avg,b.avg,isAsc);
                  case 'Index_of_coincidence':
                    return this.compare(a.Index_of_coincidence,b.Index_of_coincidence,isAsc);
                    case 'Lang':
                    return this.compare(a.Lang,b.Lang,isAsc);
                    case 'Lang_index':
                    return this.compare(a.Lang_index,b.Lang_index,isAsc);
                    case 'Difference':
                    return this.compare(a.Difference,b.Difference,isAsc);
                    case 'Anagram':
                    return this.compare(a.Anagram,b.Anagram,isAsc);
                    case 'vowel':
                    return this.compare(a.vowel,b.vowel,isAsc);
          default:
        return 0;
      }
    });
      }

  


compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

//SORTING ENDS

//WORKER INIT METHOD
  init_worker(){    
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.saleData=data.response;
      };
      worker.postMessage({page:"Page1",display_results:this.display_results,graph_settings:this.graph_settings});
    } else {
   
      this.init_graph();
      
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


 
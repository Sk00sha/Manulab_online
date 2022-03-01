import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvDataServiceService {

  constructor() { 
    
  }

  constructCSV(object:any):void{
    var result_csv=[];
      var csv_header:any=Object.keys(object[0]);
      result_csv.push(csv_header.join(','));

      for(let row of object){
        var items=csv_header.map((item:any) =>{
          var replacable=(''+row[item]);
          replacable=replacable.replace(/"/g, '\\"');
          replacable=replacable.replace('\n', '</br>');
            return `"${replacable}"`;
        })
        result_csv.push(items.join(','));
        
      }
    let result_data=result_csv.join('\n');
    this.downloadCSV(result_data);
       
  }
  downloadCSV(data:string){
    const file_blob=new Blob([data],{type:"text/csv"});
    let download_url=window.URL.createObjectURL(file_blob);
    let a=document.createElement('a');
    a.setAttribute('hidden','');
    a.setAttribute('href',download_url);
    a.setAttribute('download','download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

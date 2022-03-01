import { Injectable } from '@angular/core';
import { Pages } from '../models/pages';

@Injectable({
  providedIn: 'root'
})
export class DataloaderService {

  constructor() { }
  pages:Array<Pages>=[];
  db_import_pages:any=[];
  Json_data=[];

add_page(array_of_pages:Array<Pages>){
this.pages=array_of_pages;
}
set_db_data(data:any){
  this.db_import_pages=data;
}
get_db_data(){
  return this.db_import_pages;
}
get_pages():Array<Pages>{
  var temp:Array<Pages>=[];
  if (this.pages.filter(item => item.checked == true).length > 0) {
    temp=this.pages.filter(item=>item.checked==true)
  }

  
  return temp;
}
set_json_data(input:any){
  this.Json_data=input;
}

get_json_data(){
  return this.Json_data;
}

}

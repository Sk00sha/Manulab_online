import { Injectable } from '@angular/core';
import { Pages } from '../models/pages';

@Injectable({
  providedIn: 'root'
})
export class DataloaderService {

  constructor() { }
  pages:Array<Pages>=[];
  Json_data=[];

add_page(array_of_pages:Array<Pages>){
this.pages=array_of_pages;
console.log(this.pages);
}
get_pages():Array<Pages>{
  return this.pages;
}
set_json_data(input:any){
  this.Json_data=input;
}

get_json_data(){
  return this.Json_data;
}

}

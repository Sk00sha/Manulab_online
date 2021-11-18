import { Injectable } from '@angular/core';
import { Pages } from '../models/pages';

@Injectable({
  providedIn: 'root'
})
export class DataloaderService {

  constructor() { }
  pages:Array<Pages>=[];
  

add_page(array_of_pages:Array<Pages>){
this.pages=array_of_pages;
console.log(this.pages);
}
get_pages():Array<Pages>{
  return this.pages;
}

}

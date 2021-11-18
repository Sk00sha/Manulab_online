import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  constructor() { }
  available_filters:string[]=[];

  exchangeList(name_filter_group:number):void{
    if(name_filter_group==1){
      console.log("filter one inside");
       this.available_filters=["Remove accents"];
    }
    if(name_filter_group==2){
      this.available_filters=["Frequency of text elements",'Index of coincidence','Shannons entrophy'
      ,'Pattern search','Adjacent contacts','Text element distances'];
    }
    if(name_filter_group==3){
      this.available_filters=["Anagram detection",'Vowel detection','Language guess'];
    }
    console.log(this.available_filters);
  }
  setAvailable_filters(array:string[]){
    this.available_filters=array;
  }
  getAvailable_filters(){
    return this.available_filters;
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  constructor() { }
  available_filters:string[]=[];
  all_filters:string[]=["Remove accents","Frequency of text elements",'Index of coincidence','Shannons entrophy'
  ,'Pattern search','Adjacent contacts','Text element distances',"Anagram detection",'Vowel detection','Language guess']

    filter_from_data(string_search:string):string[]{
      const matches = this.all_filters.filter(s => s.includes(string_search));
      return matches;
    }
    exchangeList(name_filter_group:number):void{
    if(name_filter_group==2){
      console.log("filter one inside");
       this.available_filters=["Remove accents"];
    }
    if(name_filter_group==1){
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

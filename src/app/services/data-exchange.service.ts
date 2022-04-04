import { Injectable } from '@angular/core';
import { FilterObject } from '../models/filter_object';
import { Pages } from '../models/pages';
@Injectable({
  providedIn: 'root',
})
export class DataExchangeService {
  //this service is used to transfer service groups into UI when choosing in analysis page
  constructor() {}
  available_filters: any[] = [];
  applied_filters_array:any[]=[];
  analysis_results:any[]=[];
  analysis_results_pages:any[]=[];
  //all filters are use when using search, in analysis pages,returns filters from this list
  all_filters: any[] = [
    //this is representation of a filter that represents all filters in the app refference-> import { FilterObject } from '../models/filter_object';
        new FilterObject("Frequency of text elements","",false,false,false,1,false,"","Sukhotin",1),
        new FilterObject("Index of coincidence","",false,false,false,1,false,"","Sukhotin",1),
        new FilterObject("Shannons entropy","",false,false,false,1,false,"","Sukhotin",1),
        new FilterObject("Pattern search","",false,false,false,1,false,"","Sukhotin",1),
        new FilterObject("Letter Count","",false,false,false,1,false,"","Sukhotin",1),
        new FilterObject("Adjacent contacts","",false,false,false,1,false,"","Sukhotin",1),
        new FilterObject("Text element distances","",false,false,false,1,false,"","Sukhotin",1),
        new FilterObject("Remove accents","",false,false,false,1,false,"","Sukhotin",2),
        new FilterObject('Anagram detection',"",false,false,false,1,false,"","Sukhotin" ,3),
        new FilterObject('Vowel detection',"",false,false,false,1,false,"","Sukhotin" ,3),
        new FilterObject('Language guess' ,"",false,false,false,1,false,"","Sukhotin",3)
  ];
  //searches for filter in all filters when using search bar analysis page
  filter_from_data(string_search: string): string[] {
    const matches = this.all_filters.filter((s) =>
    s.name.toLowerCase().includes(string_search.toLowerCase())
    );
    return matches;
  }
  //exhage list is used when clicking groups in analysis page(first 3 buttons above analysis component)
  exchangeList(name_filter_group: number): void {
    if(name_filter_group==4){  
      this.available_filters=this.all_filters;
    }
    else{
    const filtered_data=this.all_filters;
    this.available_filters=filtered_data.filter(function (el) {
      return el.group_id==name_filter_group;
    });
  }
  
  }
  //just setters and getters
  setAvailable_filters(array: string[]) {
    this.available_filters = array;
  }
  getAvailable_filters() {
    return this.available_filters;
  }
  applied_filters(list:any[]) {
    this.applied_filters_array=list;
  }
  getapplied_filters() {
    return this.applied_filters_array;
  }
  analysis_result_set(list:any){
    this.analysis_results=list;
  }
  get_all_filter(){
    return this.all_filters;
  }
  //result pages as inputs for analysis results component to display
  set_result_pages(pages_array:any[]){
    this.analysis_results_pages=pages_array;
  }
  get_result_pages(){
    return this.analysis_results_pages;
  }
}

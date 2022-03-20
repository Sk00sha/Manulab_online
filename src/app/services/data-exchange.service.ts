import { Injectable } from '@angular/core';
import { FilterObject } from '../models/filter_object';
@Injectable({
  providedIn: 'root',
})
export class DataExchangeService {
  //this service is used to transfer service groups into UI when choosing in analysis page
  constructor() {}
  available_filters: any[] = [];
  applied_filters_array:any[]=[];
  analysis_results:any[]=[];
  //all filters are use when using search, in analysis pages,returns filters from this list
  all_filters: any[] = [
    //this is representation of a filter that represents all filters in the app refference-> import { FilterObject } from '../models/filter_object';
    new FilterObject("Frequency of text elements","",false,false,false,1,false,"","Sukhotin"),
        new FilterObject("Index of coincidence","",false,false,false,1,false,"","Sukhotin"),
        new FilterObject("Shannons entropy","",false,false,false,1,false,"","Sukhotin"),
        new FilterObject("Pattern search","",false,false,false,1,false,"","Sukhotin"),
        new FilterObject("Adjacent contacts","",false,false,false,1,false,"","Sukhotin"),
        new FilterObject("Text element distances","",false,false,false,1,false,"","Sukhotin"),
        new FilterObject(  'Anagram detection',"",false,false,false,1,false,"","Sukhotin" ),
        new FilterObject( 'Vowel detection',"",false,false,false,1,false,"","Sukhotin" ),
        new FilterObject(  'Language guess' ,"",false,false,false,1,false,"","Sukhotin")
  ];
  //searches for filter in all filters when using search bar analysis page
  filter_from_data(string_search: string): string[] {
    const matches = this.all_filters.filter((s) =>
      s.name.includes(string_search)
    );
    return matches;
  }
  //exhage list is used when clicking groups in analysis page(first 3 buttons above analysis component)
  exchangeList(name_filter_group: number): void {
    if (name_filter_group == 2) {
     
      this.available_filters = [
        new FilterObject("Remove accents","",false,false,false,1,false,"","Sukhotin")
      ];
    }
    if (name_filter_group == 1) {
      this.available_filters = [
        new FilterObject("Frequency of text elements","",false,false,false,1,false,"","Sukhotin"),
        new FilterObject("Index of coincidence","",false,false,false,1,false,"","Sukhotin"),
        new FilterObject("Shannons entropy","",false,false,false,1,false,"","Sukhotin"),
        new FilterObject("Pattern search","",false,false,false,1,false,"","Sukhotin"),
        new FilterObject("Adjacent contacts","",false,false,false,1,false,"","Sukhotin"),
        new FilterObject("Text element distances","",false,false,false,1,false,"","Sukhotin")
      ];
    }
    if (name_filter_group == 3) {
      this.available_filters = [
        new FilterObject('Anagram detection' ,"",false,false,false,1,false,"","Sukhotin"),
        new FilterObject('Vowel detection',"",false,false,false,1,false,"","Sukhotin"),
        new FilterObject("Language guess","",false,false,false,1,false,"","Sukhotin")
      ];
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
}

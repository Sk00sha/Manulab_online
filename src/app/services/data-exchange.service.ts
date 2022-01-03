import { Injectable } from '@angular/core';
import { FilterObject } from '../models/filter_object';
@Injectable({
  providedIn: 'root',
})
export class DataExchangeService {
  constructor() {}
  available_filters: any[] = [];
  applied_filters_array:any[]=[];
  analysis_results:any[]=[];
  all_filters: any[] = [
    new FilterObject("Frequency of text elements","",false,false,false,1,false,""),
        new FilterObject("Index of coincidence","",false,false,false,1,false,""),
        new FilterObject("Shannons entropy","",false,false,false,1,false,""),
        new FilterObject("Pattern search","",false,false,false,1,false,""),
        new FilterObject("Adjacent contacts","",false,false,false,1,false,""),
        new FilterObject("Text element distances","",false,false,false,1,false,""),
    { name: 'Anagram detection' },
    { name: 'Vowel detection' },
    { name: 'Language guess' },
  ];

  filter_from_data(string_search: string): string[] {
    const matches = this.all_filters.filter((s) =>
      s.name.includes(string_search)
    );
    return matches;
  }
  exchangeList(name_filter_group: number): void {
    if (name_filter_group == 2) {
     
      this.available_filters = [
      
        new FilterObject("Remove accents","",false,false,false,1,false,"")
      ];
    }
    if (name_filter_group == 1) {
      this.available_filters = [
        new FilterObject("Frequency of text elements","",false,false,false,1,false,""),
        new FilterObject("Index of coincidence","",false,false,false,1,false,""),
        new FilterObject("Shannons entropy","",false,false,false,1,false,""),
        new FilterObject("Pattern search","",false,false,false,1,false,""),
        new FilterObject("Adjacent contacts","",false,false,false,1,false,""),
        new FilterObject("Text element distances","",false,false,false,1,false,"")
      ];
    }
    if (name_filter_group == 3) {
      this.available_filters = [
        { name: 'Anagram detection' },
        { name: 'Vowel detection' },
        new FilterObject("Language guess","",false,false,false,1,false,"")
      ];
    }
  
  }
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
}

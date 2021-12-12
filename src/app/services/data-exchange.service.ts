import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataExchangeService {
  constructor() {}
  available_filters: any[] = [];
  applied_filters_array:any[]=[];
  analysis_results:any[]=[];
  all_filters: any[] = [
    {
      name: 'Remove accents',
      delimiter: '',
      approx: false,
      normalize: false,
      relative: false,
      n: 1,
    },
    {
      name: 'Frequency of text elements',
      delimiter: '',
      approx: false,
      normalize: false,
      relative: false,
      n: 1,
    },
    {
      name: 'Index of coincidence',
      delimiter: '',
      approx: false,
      normalize: false,
      relative: false,
      n: 1,
    },
    {
      name: 'Shannons entrophy',
      delimiter: '',
      approx: false,
      normalize: false,
      relative: false,
      n: 1,
    },
    {
      name: 'Pattern search',
      delimiter: '',
      approx: false,
      normalize: false,
      relative: false,
      n: 1,
    },
    {
      name: 'Adjacent contacts',
      delimiter: '',
      approx: false,
      normalize: false,
      relative: false,
      n: 1,
    },
    {
      name: 'Text element distances',
      delimiter: '',
      approx: false,
      normalize: false,
      relative: false,
      n: 1,
    },
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
        {
          name: 'Remove accents',
          delimiter: '',
          approx: false,
          normalize: false,
          relative: false,
          n: 1,
        },
      ];
    }
    if (name_filter_group == 1) {
      this.available_filters = [
        {
          name: 'Frequency of text elements',
          delimiter: '',
          approx: false,
          normalize: false,
          relative: false,
          n: 1,
        },
        {
          name: 'Index of coincidence',
          delimiter: '',
          approx: false,
          normalize: false,
          relative: false,
          n: 1,
        },
        {
          name: 'Shannons entrophy',
          delimiter: '',
          approx: false,
          normalize: false,
          relative: false,
          n: 1,
        },
        {
          name: 'Pattern search',
          delimiter: '',
          approx: false,
          normalize: false,
          relative: false,
          n: 1,
        },
        {
          name: 'Adjacent contacts',
          delimiter: '',
          approx: false,
          normalize: false,
          relative: false,
          n: 1,
        },
        {
          name: 'Text element distances',
          delimiter: '',
          approx: false,
          normalize: false,
          relative: false,
          n: 1,
        },
      ];
    }
    if (name_filter_group == 3) {
      this.available_filters = [
        { name: 'Anagram detection' },
        { name: 'Vowel detection' },
        { name: 'Language guess' },
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
  analysis_result_set(list:any){
    this.analysis_results=list;
  }
}

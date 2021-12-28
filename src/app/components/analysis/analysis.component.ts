import { Component, OnInit } from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { DataloaderService } from 'src/app/services/dataloader.service';
import { Pages } from 'src/app/models/pages';
import { lower_case } from 'src/app/filters/text operations/lower_case';
import { remove_accents } from 'src/app/filters/text operations/remove_accents';
import { countNGram } from 'src/app/filters/Statistics/helpers';
import { getAbsoluteNGrams } from 'src/app/filters/Statistics/helpers';
import { getRelativeNgrams } from 'src/app/filters/Statistics/helpers';
import { frequency_of_text_elements } from 'src/app/filters/Statistics/frequency_of_text_elements';
import { shannons_entropy } from 'src/app/filters/Statistics/shannons_entropy';
import { index_of_coincidence } from 'src/app/filters/Statistics/index_of_coincidence';
import { pattern_search } from 'src/app/filters/Statistics/pattern_search';
import { findPosition } from 'src/app/filters/Statistics/helpers';
import { CountContacts } from 'src/app/filters/Statistics/helpers';
import { AdjacentContacts } from 'src/app/filters/Statistics/adjacent_contacts';
import { findDistances } from 'src/app/filters/Statistics/helpers';
import { LetterDistances } from 'src/app/filters/Statistics/letter_distances';
import { FilterController } from 'src/app/filters/Controller/Filter_Controller';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  constructor(private exchange:DataExchangeService,private data_load:DataloaderService) { }
  ngOnInit(): void {
    this.pages=this.data_load.get_pages();
    this.applied=this.exchange.applied_filters_array;
  }
 
  applied:any[] = [];
  filters:any[] = [];
  pages:Array<Pages>=[];
  list_bool_toggle:boolean=false;

  receiveData($event:any){
    this.filters=$event;
   
    }

  delete_filters(){
    this.applied=[];
    this.exchange.applied_filters(this.applied);
  }
    
recieve_disable(event:boolean){
this.list_bool_toggle=event;

}
make_analysis(){  
      var controller=new FilterController(this.pages);
      this.applied=this.exchange.getapplied_filters();
      controller.add_multiple_filters(this.applied);
      var result=controller.start_analysis();
      this.exchange.analysis_result_set(result);
      console.log(result);
}

  

  receive_applied_filterData($event:any){
    this.applied=$event;
    
    }

  add(event: any,i:number){    

    this.applied.push(this.filters[i]);
    this.exchange.applied_filters(this.applied);
      
  }
  delete(event: any,i:number){
    this.applied.splice(i,1);
    this.exchange.applied_filters(this.applied);
    
}
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
    } else if(event.previousContainer.id!="cdk-drop-list-1") {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      this.exchange.applied_filters(this.applied);
                        
      this.filters.push(event.container.data[event.currentIndex]);
                  
    }
  
  }

}

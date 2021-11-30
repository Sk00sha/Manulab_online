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
import { shannons_entrophy } from 'src/app/filters/Statistics/shannons_entrophy';
import { index_of_coincidence } from 'src/app/filters/Statistics/index_of_coincidence';
import { pattern_search } from 'src/app/filters/Statistics/pattern_search';
import { findPosition } from 'src/app/filters/Statistics/helpers';
import { CountContacts } from 'src/app/filters/Statistics/helpers';
import { AdjacentContacts } from 'src/app/filters/Statistics/adjacent_contacts';
import { findDistances } from 'src/app/filters/Statistics/helpers';
import { LetterDistances } from 'src/app/filters/Statistics/letter_distances';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  constructor(private exchange:DataExchangeService,private data_load:DataloaderService) { }
  ngOnInit(): void {
    this.pages=this.data_load.get_pages();
  }
 
  text:string="Mám sa fajn ďakujem ti merciiiiiiiii vňať sľatina"
  applied:string[] = [];
  filters:string[] = [];
  pages:Array<Pages>=[];

  receiveData($event:any){
    this.filters=$event;
    console.log(this.pages)
    }

  delete_filters(){
    this.applied=[];
  }
    

make_analysis(){
  let text = new remove_accents();
  var text2=text.activate(this.text,true);
  //console.log(text2);
  var pages:Pages[]=[{  id: 1,
      img: "undefined",
      page_text: "Distance of letters",
      name:"string",
      checked:true}]
    

  var ngrams= new frequency_of_text_elements();
  console.log(ngrams.activate(pages,true,"",1));
  var entrophy=new shannons_entrophy();
  //pages,relative,delimiter,n
  console.log(entrophy.activate(pages,true,"",1));
  var ioc=new index_of_coincidence();
  //pages,approx,delimiter,n
  console.log(ioc.activate(pages,true,"",1));
  var patt_search= new pattern_search();
  console.log(patt_search.activate(pages,"strings",""));
 var ac=new AdjacentContacts()
 console.log(ac.activate(pages,""));

var distance=new LetterDistances();
console.log(distance.activate(pages,""));
}

  

  receive_applied_filterData($event:any){
    this.applied=$event;
    console.log(this.applied)
    }

  add(event: any){
      this.applied.push(event.path[1].textContent.replace('Add',''))
  }
  delete(event: any,i:number){
    this.applied.splice(i,1)
    
}
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container ) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.container.id);
      
    } else if(event.previousContainer.id!="cdk-drop-list-1") {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        
                        
      this.filters.push(event.container.data[event.currentIndex]);
                  
    }
  
  }

}

import { Component, OnInit } from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { DataloaderService } from 'src/app/services/dataloader.service';
import { Pages } from 'src/app/models/pages';

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
  filters:string[] = [];
  pages:Array<Pages>=[];
  receiveData($event:any){
    this.filters=$event;
    console.log(this.pages)
    }


    

  applied:string[] = [];
  add(event: any){
      this.applied.push(event.path[1].textContent.replace('Add',''))
  }
  delete(event: any){
    console.log(event.currentIndex)
    console.log(event.path[3]);
    
}
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
  
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        console.log(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
                        
      this.filters.push(event.container.data[event.currentIndex]);
                  
    }
  
  }

}

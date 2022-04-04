import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Pages } from 'src/app/models/pages';
import SwiperCore, { Pagination,Navigation } from "swiper";
import {DataloaderService} from '../../services/dataloader.service';
import {DataExchangeService} from '../../services/data-exchange.service';
SwiperCore.use([Pagination]);
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.scss']
})
export class PageViewerComponent implements OnInit {
  src:string='assets/images/placeholder.jpg';
  @Output() emit_boolean=new EventEmitter<any>();
  @Output() emit_src=new EventEmitter<any>();
  constructor(private data_load:DataloaderService,
              private data_exchange:DataExchangeService) { }
  pages:Array<Pages>=[]
  img_src:string="";
  boolean_show:boolean=false;
  ngOnInit(): void {
    this.pages=this.data_load.get_pages();
  }
  preventSimpleClick: Boolean = true;    
  timer:any=0;
  singleClick(): void{
    this.timer = 0;
    this.preventSimpleClick = false;


    this.timer = setTimeout(() => {
      if(!this.preventSimpleClick){
        
      }
    }, 300);

  }

  doubleClick(event:any): void{
    this.preventSimpleClick = true;
    clearTimeout(this.timer);
 
    this.emit_boolean.emit(true);
    this.emit_src.emit(event.target.src);
    this.data_exchange.boolean_show_modal=true;
    
    
  }
}

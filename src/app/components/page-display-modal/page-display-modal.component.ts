import { Component, OnInit,Input } from '@angular/core';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { Pages } from 'src/app/models/pages';
import { DataExchangeService } from 'src/app/services/data-exchange.service';

@Component({
  selector: 'app-page-display-modal',
  templateUrl: './page-display-modal.component.html',
  styleUrls: ['./page-display-modal.component.scss']
})
export class PageDisplayModalComponent implements OnInit {
  showModal:boolean=false;
  @Input() pages_iterator:number;
  pages_to_show:any=[];
  constructor(private exchange:DataExchangeService) { }
  faFile=faFile;
  ngOnInit(): void {
    this.pages_to_show=this.exchange.get_result_pages()[this.pages_iterator];
  }
  setModal(){

    this.showModal=true;
  }

}

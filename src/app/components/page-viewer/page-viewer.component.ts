import { Component, OnInit } from '@angular/core';
import { Pages } from 'src/app/models/pages';
import SwiperCore, { Pagination,Navigation } from "swiper";
import {DataloaderService} from '../../services/dataloader.service'
SwiperCore.use([Pagination]);
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.scss']
})
export class PageViewerComponent implements OnInit {
  src:string='assets/images/placeholder.jpg';
  constructor(private data_load:DataloaderService) { }
  pages:Array<Pages>=[]
  ngOnInit(): void {
    this.pages=this.data_load.get_pages();
  }

}

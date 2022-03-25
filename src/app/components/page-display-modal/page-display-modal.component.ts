import { Component, OnInit } from '@angular/core';
import { faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-display-modal',
  templateUrl: './page-display-modal.component.html',
  styleUrls: ['./page-display-modal.component.scss']
})
export class PageDisplayModalComponent implements OnInit {

  constructor() { }
  faFile=faFile;
  ngOnInit(): void {
  }

}

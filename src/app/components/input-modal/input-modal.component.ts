import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent implements OnInit {
  showModal:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}

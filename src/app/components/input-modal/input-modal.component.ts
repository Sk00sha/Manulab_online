import { Component, EventEmitter, OnInit } from '@angular/core';
import { Input,Output } from '@angular/core';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent implements OnInit {
  showModal:boolean=false;
  disable_input:boolean=false;
  @Input() name_of_input:any;
  @Output() disable=new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  set_name($event:any){
    console.log($event);
  }
  send_disable_flag(){
    this.disable.emit(this.disable_input);
  }
  send_enable_flag(){
    this.disable.emit(true);
  }

}

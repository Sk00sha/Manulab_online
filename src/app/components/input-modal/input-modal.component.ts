import { Component, EventEmitter, OnInit,ViewChild } from '@angular/core';
import { Input,Output } from '@angular/core';
import { Form1Component } from '../form1/form1.component';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent implements OnInit {
  showModal:boolean=false;
  faCog=faCog;
  disable_input:boolean=true;
  @Input() name_of_input:any;
  @Input() number_of_input:number;
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
    //sends false to template to enable list wrangling
    this.disable.emit(false);
  }
  recieve_modal_close($event:any){
    //function calls when we close with form button and sends false to template to enable list wrangling
      this.showModal=$event;
      this.send_enable_flag();
  }
  

}

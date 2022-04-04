import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-picture-modal',
  templateUrl: './picture-modal.component.html',
  styleUrls: ['./picture-modal.component.scss']
})
export class PictureModalComponent implements OnInit {
  
  faTimes=faTimes;
  @Output() emit_boolean_close=new EventEmitter<any>();
  @Input() show_modal:boolean;
  @Input() image_src:string;
  constructor() { }

  ngOnInit(): void {
  }
  send_data(){
  this.emit_boolean_close.emit(false);
}
}

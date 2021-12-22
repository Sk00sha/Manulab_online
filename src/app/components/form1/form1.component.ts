import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { Output,Input  } from '@angular/core';
import { DataExchangeService } from 'src/app/services/data-exchange.service';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss']
})
export class Form1Component implements OnInit {

  form:FormGroup;
  constructor(private fb:FormBuilder,private exchange_service:DataExchangeService) { }
  @Input() name_of_filter:any;
  @Input() number_of_filter:number;
  //output objektu, ktory definuje data pre filter do input modalu a emitter
  @Output() message=new EventEmitter<boolean>();

  ngOnInit(): void {
    var exchange_service_list:any=this.exchange_service.getapplied_filters();
    this.form=this.fb.group({
      delimiter:exchange_service_list[this.number_of_filter].delimiter,
      n:exchange_service_list[this.number_of_filter].n,
      pattern:exchange_service_list[this.number_of_filter].pattern,
      Spaces:exchange_service_list[this.number_of_filter].Spaces,
      approx:exchange_service_list[this.number_of_filter].approx,
      normalize:exchange_service_list[this.number_of_filter].normalize,
      relative:exchange_service_list[this.number_of_filter].relative
    });
  
  }

  send_notification(){
    this.message.emit(false);
    this.set_filter_specs();
  }
  reply(){
    console.log("oy");
  }

  set_filter_specs(){
    var exchange_service_list:any=this.exchange_service.getapplied_filters();
    //console.log(this.exchange_service.getapplied_filters());
    console.log(exchange_service_list);
    
      exchange_service_list[this.number_of_filter]={
        name: exchange_service_list[this.number_of_filter].name,
        Spaces:this.form.get('Spaces')?.value,
        group:1,
        delimiter: this.form.get('delimiter')?.value,
        approx: this.form.get('approx')?.value,
        normalize: this.form.get('normalize')?.value,
        relative: this.form.get('relative')?.value,
        n: this.form.get('n')?.value,
      }
 
    
  }

}

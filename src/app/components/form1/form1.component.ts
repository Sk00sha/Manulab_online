import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { Output,Input } from '@angular/core';
@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss']
})
export class Form1Component implements OnInit {

  form:FormGroup;
  constructor(private fb:FormBuilder) { }
  @Input() name_of_filter:any;
  
  ngOnInit(): void {
   
    this.form=this.fb.group({
      delimiter:'',
      n:0,
      pattern:'',
      Spaces:true
    });
  
  }

}

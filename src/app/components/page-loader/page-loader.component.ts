import { Component, OnInit } from '@angular/core';
import { DataloaderService } from 'src/app/services/dataloader.service';
import { Pages } from 'src/app/models/pages';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import {Metadata} from 'src/app/models/page_metadata'
import { DbRequestService } from 'src/app/services/db-request.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss'],
})
export class PageLoaderComponent implements OnInit {
  constructor(
    private dataService: DataloaderService,
    private db_connector:DbRequestService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.Pages=this.dataService.pages;
    if(this.dataService.get_db_data().length==0){
  
    var data:Promise<any>=this.db_connector.fetch_db_data();
    var db_pages:Array<Pages>=[];
    data.then(value=>{
      var data_pages:any=[];
      var name_item="";
      var id=0;
      value["records"].forEach((manuscript:any)=>{
         name_item=manuscript["name"];
          manuscript["data"].forEach((item:any)=>{
              if(item.filetype=="text"){
                id++;
                data_pages.push(name_item+" - "+item["description"]);
                
                db_pages.push(new Pages(id,'assets/images/placeholder.jpg',item["blobb"],name_item+" - "+item["description"],false));
              }
          });
        name_item="";
      });
      this.dataService.set_db_data(db_pages);
      this.dropdown_list_data=this.dataService.get_db_data();
      this.repartition_select();
      
    });
  }else{
   
    this.dropdown_list_data=this.dataService.get_db_data();
    this.repartition_select();
  }
  }
  activeState:number = -1;
  search:any=faSearch;
  object:any={};
  edit_indice:number=-1;
  edit_flag:boolean=false;
  display_partitioner:boolean=false;
  display_loader:boolean=false;
  any_data:any;
  //vars used in pagination
  scroller:number=0;
  dropdown_list_data:any=[];
  dropdown_partitions:any[]=[];
  //icons
  faTimes = faCloudUploadAlt;
  faDelete=faTimes;
  faArrowLeft=faArrowLeft;
  faArrowRight=faArrowRight;
  //all meintenance variables for upload
  url: string = 'assets/images/placeholder.jpg';
  text: string = '';
  img_name:string='placeholder';
  text_name: string = '';
  bulk_upload:boolean=false;
  id_generator: number = 0;
  Pages: Pages[] = [];
  //partitions for grouping
  Page_pictures:Pages[]=[];
  Page_texts:Pages[]=[];
  filepath_data:Metadata[]=[];
  //icons
  faplus=faPlus;
  fadb=faDatabase;
  show_tast_failure(){
    this.toastr.error('Upload text file please');
  }
  delete_page(event:any,i:number){
    this.Pages.splice(i,1);
    this.dataService.pages=this.Pages;
  }
  show_db_segment():void{
    if(this.display_loader==false){
      this.display_loader=true;
    }
    else{
      this.display_loader=false;
    }
    
  }
  next_page(){
    var desired_length=this.dropdown_partitions.length-1;
    if(this.scroller<desired_length){
        this.scroller++;
    }else{
      this.scroller=0;
    }
    
  }
  first_page(){
    var desired_length=this.dropdown_partitions.length-1;
    this.scroller=0;
  }
  last_page(){
    var desired_length=this.dropdown_partitions.length-1;
    this.scroller=desired_length;
  }
  previous_page(){
    var desired_length=0;
    if(this.scroller>desired_length){
        this.scroller--
    }else{
      this.scroller=this.dropdown_partitions.length-1;
    }
  }

  //state when editing
  setStateAsActive(i:number){
    this.activeState=i;
  }


  repartition_select(){
    var temp_list:any[]=[];
    var i,j, chunk = 25;
    for (i = 0,j = this.dropdown_list_data.length; i < j; i += chunk) {
    temp_list = this.dropdown_list_data.slice(i, i + chunk);
    this.dropdown_partitions.push(temp_list);
    temp_list=[];
    
}
  }
  choose_page(i:number){
    if(!this.display_partitioner){
      this.text=this.dropdown_list_data[i].page_text;
      this.text_name=this.dropdown_list_data[i].name;
    }
    if(this.display_partitioner){
      this.text=this.dropdown_partitions[this.scroller][i].page_text;
      this.text_name=this.dropdown_partitions[this.scroller][i].name;
    }

  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Pages, event.previousIndex, event.currentIndex);
    
    
  }
  swap_lists(event:any):void{
    var backup=this.dropdown_partitions;
      if(event.currentTarget.checked){
          this.display_partitioner=true;
      }
      else{
        this.display_partitioner=false;
        
      }
      
  }
  onOptionsSelected(event:any){
    const matches = this.dataService.get_db_data().filter((s:any) =>
    s.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
  this.dropdown_list_data=matches;
  this.display_partitioner=false;
    
}
edit_page(){
  this.Pages[this.edit_indice].page_text=this.text;
  this.Pages[this.edit_indice].img=this.url;
  this.edit_flag=false;
  this.edit_indice=-1;
  this.url = 'assets/images/placeholder.jpg';
  this.text="";
  this.text_name="placeholder";

}

  uploadPage() {
    this.dropdown_list_data=this.dataService.get_db_data();
    if( this.edit_flag==true &&this.edit_indice!==-1){
     this.edit_page();
    }
    else{
    if (this.text.length>0 /*&& this.Page_texts.length>0 */ || this.display_loader==true && this.text.length>0  ) {
      this.any_data=null;
      if(this.bulk_upload){
        this.url='assets/images/placeholder.jpg';
        if(this.Pages.length >0){
          this.id_generator=this.Pages[this.Pages.length-1].id;
        }
      for(let i=0;i<this.Page_texts.length;i++){
              this.id_generator++;
                this.Pages.push(new Pages(this.id_generator,this.url,this.Page_texts[i].page_text,this.Page_texts[i].name,true));   
      }
      for(let j=0;j<this.Pages.length;j++){
        this.Pages[j].page_text=this.Pages[j].page_text.replace(/\r\n/g,"\n");
        for(let i=0;i<this.Page_pictures.length;i++){
          if(this.Page_pictures[i].name===this.Pages[j].name){
            
            this.Pages[j].img=this.Page_pictures[i].img; 
          
          }
        }
    }
      this.url = 'assets/images/placeholder.jpg';
      this.text = '';
      this.Page_pictures=[];
      this.Page_texts=[];
      this.filepath_data=[];
      this.bulk_upload=false;
    }
    else{
      if(this.Pages.length >0){
        this.id_generator=this.Pages[this.Pages.length-1].id;
      }
      this.id_generator++;
      //TUTO sa meni text - simple regex aby eliminovalo niektore neviditelne znaky v txt subore
      this.text=this.text.replace(/\r\n/g,"\n");
      this.Pages.push(new Pages(this.id_generator,this.url,this.text,this.text_name,true));
      this.url = 'assets/images/placeholder.jpg';
      this.text = '';
      this.Page_pictures=[];
      this.Page_texts=[];
      this.filepath_data=[];
    }
    
    } 
    else {
      this.show_tast_failure();
    }
    this.url = 'assets/images/placeholder.jpg';
    this.text = '';
  }
  }
  selectfile(e: any): void {
    this.display_loader=false;
    if (e.target.files) {
      if (e.target.files.length==1) {
        this.bulk_upload=false;
      }
      if(e.target.files.length>1){
        this.bulk_upload=true;
      }
     
    for(let i=0;i<e.target.files.length;i++){
      var reader = new FileReader();
      let input_type: Array<string> = e.target.files[i].type.split('/');
      let name_split: Array<string>=[];
      if (input_type[1] == 'plain') {

          reader.readAsText(e.target.files[i]);
          this.filepath_data.push({name:e.target.files[i].name.split(".")[0],blob:e.target.files[i]});
          reader.onload = (event: any) => {
          name_split=e.target.files[i].name.split('.');
          this.text_name = name_split[0];
          this.text = event.target.result;
          this.Page_texts.push(new Pages(this.id_generator,'assets/images/placeholder.jpg',this.text,this.text_name,true));
         
          };
      }
     // this.reset_vars();
      if (input_type[1] == 'png' || input_type[1] == 'jpeg'){
        reader.readAsDataURL(e.target.files[i]);
        this.filepath_data.push({name:e.target.files[i].name.split(".")[0],blob:e.target.files[i]});
        reader.onload = (event: any) => {
        name_split=e.target.files[i].name.split('.');
        this.img_name = name_split[0];
        this.url = event.target.result;
        this.Page_pictures.push(new Pages(0,this.url,"",this.img_name,true));
      };
    
      }
      }
      }  
    }
check_pages(int:number){
  this.edit_flag=true;
  this.edit_indice=int;
  this.text=this.Pages[int].page_text;
  this.url= this.Pages[int].img;
  this.display_loader=false;
  
}
  check_all($event:any){
    var id = $event.target.value;
    var checked = $event.target.checked;
    this.Pages.map((item)=>{
      item.checked = checked;
      return item;
    });
    
  }


  used_pages(event: number) {
    var id = event;
   this.Pages[id].checked=!this.Pages[id].checked;
  
    
    this.dataService.add_page(this.Pages);
  }
}

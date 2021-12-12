import { Component, OnInit } from '@angular/core';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
import { DataloaderService } from 'src/app/services/dataloader.service';
import { Pages } from 'src/app/models/pages';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';


import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {Metadata} from 'src/app/models/page_metadata'



@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss'],
})
export class PageLoaderComponent implements OnInit {
  constructor(
    private dataService: DataloaderService,
    private af:AngularFireStorage
  ) {}

  ngOnInit(): void {this.Pages=this.dataService.pages}
  faTimes = faCloudUploadAlt;
  url: string = 'assets/images/placeholder.jpg';
  text: string = '';
  img_name:string='placeholder';
  text_name: string = '';
  bulk_upload:boolean=false;
  id_generator: number = 0;
  Pages: Pages[] = [];
  Page_pictures:Pages[]=[]
  Page_texts:Pages[]=[]
  filepath_data:Metadata[]=[];
    

  uploadPage() {
   
    if (this.text) {
      if(this.bulk_upload){
      for(let i=0;i<this.Page_texts.length;i++){
              this.id_generator++;
                this.Pages.push(new Pages(this.id_generator,this.url,this.Page_texts[i].page_text,this.Page_texts[i].name,true));   
      }
      for(let i=0;i<this.Page_pictures.length;i++){
        for(let i=0;i<this.Pages.length;i++){
          if(this.Page_pictures[i].name==this.Pages[i].name){
            this.Pages[i].img=this.Page_pictures[i].img;
          }
          }
       
    }
      for(let i=0;i<this.filepath_data.length;i++){
        if(this.Pages.find(e => e.name === this.filepath_data[i].name)){
          console.log("Uploading");
          this.af.upload(this.filepath_data[i].blob.name,this.filepath_data[i].blob);
          
        }
      }
      this.Page_pictures=[];
      this.Page_texts=[];
      this.filepath_data=[];
    }
    else{
      
      this.id_generator++;
      this.Pages.push(new Pages(this.id_generator,this.url,this.text,this.text_name,true));
        for(let i=0;i<this.filepath_data.length;i++){
          if(this.Pages.find(e => e.name === this.filepath_data[i].name)){
            console.log("Uploading");
            this.af.upload(this.filepath_data[i].blob.name,this.filepath_data[i].blob);
            
          }
        }
        this.Page_pictures=[];
        this.url = 'assets/images/placeholder.jpg';
        this.text = '';
    }
      this.url = 'assets/images/placeholder.jpg';
      this.text = '';
    
    } else {
      alert('Upload textfile please!');
    }
  }
  selectfile(e: any): void {
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
        console.log(e.target.files.length);
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
      console.log(this.filepath_data);
      }
      }
      }  
    }

  check_all($event:any){
    var id = $event.target.value;
    var checked = $event.target.checked;
    this.Pages.map((item)=>{
      item.checked = checked;
      return item;
    });
    
  }

  
  used_pages($event: any) {
    var id = $event.target.value;
    var checked = $event.target.checked;
    this.Pages.map((item) => {
      if (item.id == id) {
        item.checked = checked;
        return item;
      }
      return item;
    });
    
    
    this.dataService.add_page(this.Pages);
  }
}

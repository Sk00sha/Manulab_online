import { Component, OnInit } from '@angular/core';
import { DataloaderService } from 'src/app/services/dataloader.service';
import { Pages } from 'src/app/models/pages';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import {Metadata} from 'src/app/models/page_metadata'




@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss'],
})
export class PageLoaderComponent implements OnInit {
  constructor(
    private dataService: DataloaderService,
  ) {}

  ngOnInit(): void {this.Pages=this.dataService.pages}
  faTimes = faCloudUploadAlt;
  faDelete=faTimes;
  url: string = 'assets/images/placeholder.jpg';
  text: string = '';
  img_name:string='placeholder';
  text_name: string = '';
  bulk_upload:boolean=false;
  id_generator: number = 0;
  Pages: Pages[] = [];
  Page_pictures:Pages[]=[];
  Page_texts:Pages[]=[];
  filepath_data:Metadata[]=[];
  delete_page(event:any,i:number){
    this.Pages.splice(i,1);
    this.dataService.pages=this.Pages;
  }

  uploadPage() {
    if (this.text && this.Page_texts.length>0 || this.text_name) {
      if(this.bulk_upload){
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
          if(this.Page_pictures[i].name==this.Pages[j].name){
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
      //TUTO sa meni text - simple regex
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
      alert('Upload textfile please!');
    }
    this.url = 'assets/images/placeholder.jpg';
    this.text = '';
    console.log(this.Pages);
    
  }
  selectfile(e: any): void {
    if (e.target.files) {
      if (e.target.files.length==1) {
        this.bulk_upload=false;
      }
      if(e.target.files.length>1){
        this.bulk_upload=true;
      }
      console.log(this.bulk_upload);
      
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

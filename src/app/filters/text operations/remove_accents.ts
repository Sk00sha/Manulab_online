import { Pages } from "src/app/models/pages";


export class remove_accents {
  boolean:boolean;
  wanted_pages:Pages[];
    constructor(spaces:boolean,page:Pages[]) {
        this.boolean=spaces;
        this.wanted_pages=page;
      }
      activate(){
        var new_pages:Pages[]=[];
        this.wanted_pages.forEach(element=>{
          new_pages.push(new Pages(element.id,element.img,this.remove_accents(element.page_text,this.boolean),element.name,element.checked));
        })
        return new_pages;
      }

      remove_accents(text:string,keep_space:boolean) {
        var text_analysis=text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
       
        if(keep_space===false){
            text_analysis=text_analysis.split(' ').join('');
        }
   
        return text_analysis
      }
     
  }
  
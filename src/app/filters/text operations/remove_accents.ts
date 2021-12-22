import { Pages } from "src/app/models/pages";


export class remove_accents {
  boolean:boolean;
    constructor(spaces:boolean) {
        this.boolean=spaces;
      }
      activate(page:Pages[]){
        page.forEach(element=>{
          element.setter(this.remove_accents(element.page_text,this.boolean));
          console.log("->"+element.page_text);
          
        })
      }

      remove_accents(text:string,keep_space:boolean) {
        var text_analysis=text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
       
        if(keep_space===false){
            text_analysis=text_analysis.split(' ').join('');
        }
   
        return text_analysis
      }
     
  }
  
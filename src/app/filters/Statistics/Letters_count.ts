import { Pages } from "src/app/models/pages";
import { Filter } from "../Filter";
export class LetterCount extends Filter{
    constructor(){
        super();
    }
    isNumeric(s:any) {
        return !isNaN(s - parseFloat(s));
    }
    activate(text:Pages[]){
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    
        var Page_iterator=1;
        var return_format:any=[];
        var All_text="";
        var characters:number=0;
        var special:number=0;
        var numbers:number=0;
        text.forEach(page=>{
       
        All_text+=page.page_text;
            for (let i = 0; i < page.page_text.length; i++) {
                if(format.test(page.page_text[i])){
                    special++;
                }
                else if(this.isNumeric(page.page_text[i])){
                    numbers++;
                }
                else if(typeof page.page_text[i]==='string'){
               
                    
                    characters++;
                }
              }
            return_format.push({Page:"Page"+Page_iterator,Special:special,Numbers:numbers,Characters:characters,Total:numbers+special+characters,name:"Letter Count"});
            Page_iterator++;
            characters=0;
            special=0;
            numbers=0;
        });
        if(text.length>1){
        for (let i = 0; i < All_text.length; i++) {
            if(format.test(All_text[i])){
                special++;
            }
            else if(this.isNumeric(All_text[i])){
                numbers++;
            }
            else if(typeof All_text[i]==='string'){
                characters++;
            }
          }
          return_format.push({Page:"All",Special:special,Numbers:numbers,Characters:characters,Total:numbers+special+characters,name:"Letter Count"});
        }
          return return_format;
    }

}
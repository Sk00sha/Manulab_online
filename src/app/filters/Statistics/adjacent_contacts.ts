import { Pages } from "src/app/models/pages";
import { CountContacts } from "./helpers";

export class AdjacentContacts{
    delimiter:string;
    constructor(delimiter:string){
        this.delimiter = delimiter;
    }
    activate(pages:Pages[]){
        
            var result:any={};
            var page_index=0;
            var allInOne = "";
            // by page
            pages.forEach(element=>{
                page_index++;
                result["Page"+page_index]=([CountContacts(element.page_text,this.delimiter)])
            })
            if(pages.length>1){
                pages.forEach(element=>{
                    allInOne+=element.page_text;
                })
            }
            result["All"]=([CountContacts(allInOne,this.delimiter)]);

            var huge_object:any=[];
            var object_keys=(Object.keys(result));
            object_keys.forEach(my_key=>{
              if(my_key=="All"){
              
                var ngram_keys=(Object.keys(result[my_key][0]));
                var ngram_values=(Object.values(result[my_key][0]));
                for(var i=0;i<ngram_keys.length;i++){
                    huge_object.push({Page:my_key,element:ngram_keys[i],frequency:ngram_values[i],name:"Adjacent contacts"})
                }
               
              }
              else{
              
              var ngram_keys=(Object.keys(result[my_key][0]));
              var ngram_values=(Object.values(result[my_key][0]));
              for(var i=0;i<ngram_keys.length;i++){
                huge_object.push({Page:my_key,element:ngram_keys[i],frequency:ngram_values[i],name:"Adjacent contacts"})
            }
              
            }
            })
            return huge_object;

        }
    }

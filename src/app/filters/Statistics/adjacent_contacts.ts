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
            result["All Pages"]=([CountContacts(allInOne,this.delimiter)]);
            return result;
        }
    }

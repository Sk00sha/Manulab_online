import { Pages } from "src/app/models/pages";
import { CountContacts } from "./helpers";

export class AdjacentContacts{
    constructor(){
        
    }
    activate(pages:Pages[],delimiter:string){
        
            var result=[]
            var allInOne = "";
    
            // by page
            pages.forEach(element=>{
                result.push([CountContacts(element.page_text,delimiter)])
            })
            if(pages.length>1){
                pages.forEach(element=>{
                    allInOne+=element.page_text;
                })
            }
            result.push([CountContacts(allInOne,delimiter)])
            return result;
        }
    }

import { findPosition } from "./helpers";
import { Pages } from "src/app/models/pages";
import { Filter } from "../Filter";
export class pattern_search extends Filter{
    pattern:string;
    constructor(pattern:string){
        super();
        this.pattern=pattern;
    }

     activate(text:Pages[]){
        var result:any = [];
        var allInOne = "";
        var Page=0;
        var n = 1;
        text.forEach((page)=>{
            Page++;
           var positions= findPosition(page.page_text,this.pattern);
           if (positions.length>0) {
               positions.forEach(pos=>{
                result.push({Page:"Page"+Page,positions:pos,name:"Pattern search"});
               });
            
        }
        else{
            result.push({Page:"Page"+Page,positions:"None",name:"Pattern search"});
        }
        });
        return result;
    }

}

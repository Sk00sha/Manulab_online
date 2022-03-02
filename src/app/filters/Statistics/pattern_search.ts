import { findPosition } from "./helpers";
import { Pages } from "src/app/models/pages";

export class pattern_search{
    pattern:string;
    constructor(pattern:string){
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

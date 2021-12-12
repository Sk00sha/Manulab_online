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
        var n = 1;
        text.forEach((page)=>{
           var positions= findPosition(page.page_text,this.pattern);
           if (positions.length>0) {
            result.push(positions);
        }
        });
        return result;
    }

}

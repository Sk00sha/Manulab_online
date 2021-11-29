import { findPosition } from "./helpers";
import { Pages } from "src/app/models/pages";

export class pattern_search{
    constructor(){}

     activate(text:Pages[],pattern:string,delimiter:string){
        var result:any = [];
        var allInOne = "";
        var n = 1;
        text.forEach((page)=>{
           var positions= findPosition(page.page_text,pattern);
           if (positions.length>0) {
            result.push(positions);
        }
        });
        return result;
    }

}

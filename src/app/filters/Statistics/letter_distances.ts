
import { Pages } from "src/app/models/pages";
import { countNGram } from "./helpers";
import { findDistances } from "./helpers";

export class LetterDistances{
    n:number;
    delimiter:string;
    constructor(delimiter:string,n:number){
        this.delimiter=delimiter;
        this.n=n;
    }
    activate(pages:Pages[]){
        var result:any = {};
        var allInOne = "";
        var n = 1;
        var page_index=0;
        pages.forEach(element => {
            page_index++;
            var frequency=countNGram(element.page_text,this.delimiter,n);
            var distances = findDistances(element.page_text,"unique",this.delimiter);
            if (distances.length!=0) {
                result["Page"+page_index]=distances;
            }
        });
        if(pages.length>1){
            pages.forEach(element => {
            allInOne+=element.page_text;
            });
            var frequency=countNGram(allInOne,this.delimiter,1);
                var distances = findDistances(allInOne,"unique",this.delimiter);
                if (distances.length!=0) {
                    result["All Pages"]=distances;
                }
        }
    
        return result;
    }
}
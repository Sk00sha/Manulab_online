import { getAbsoluteNGrams } from 'src/app/filters/Statistics/helpers';
import { getRelativeNgrams } from 'src/app/filters/Statistics/helpers';
import { Pages } from 'src/app/models/pages';

export class frequency_of_text_elements {
  relative:boolean;
  delimiter:string;
  n:number;
    constructor(relative:boolean,delimiter:string,n:number) {
        this.relative=relative;
        this.delimiter=delimiter;
        this.n=n;
      }
      activate(text:Pages[]) {
        var result;
        var result_wrapper:any={};
        var page_index=0;
        if (this.relative){
          //if relative ==true then we call relativengrams
            result=getRelativeNgrams(text,this.delimiter,this.n)
        }
        else{
          //if relative==false then we call absolutengrams
          result=getAbsoluteNGrams(text,this.delimiter,this.n)
        }
        result.forEach((element:any) =>{
          page_index++;
          result_wrapper["Page"+page_index]=element;
         
        });
        return result_wrapper
      }
     
  }
  
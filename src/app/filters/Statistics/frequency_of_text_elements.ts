import { getAbsoluteNGrams } from 'src/app/filters/Statistics/helpers';
import { getRelativeNgrams } from 'src/app/filters/Statistics/helpers';
import { Pages } from 'src/app/models/pages';

export class frequency_of_text_elements {
    constructor() {
        
      }
      activate(text:Pages[],relative:boolean,delimiter:string,n:number) {
        var result;
        if (relative){
          //if relative ==true then we call relativengrams
            result=getRelativeNgrams(text,delimiter,n)
        }
        else{
          //if relative==false then we call absolutengrams
          result=getAbsoluteNGrams(text,delimiter,n)
        }
        return result
      }
     
  }
  
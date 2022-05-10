import { getAbsoluteNGrams } from 'src/app/filters/Statistics/helpers';
import { getRelativeNgrams } from 'src/app/filters/Statistics/helpers';
import { Pages } from 'src/app/models/pages';
import { Filter } from "../Filter";

export class frequency_of_text_elements extends Filter{
  relative:boolean;
  delimiter:string;
  n:number;
    constructor(relative:boolean,delimiter:string,n:number) {
      super();
        this.relative=relative;
        this.delimiter=delimiter;
        this.n=n;
      }
      activate(text:Pages[]) {
        var result;
        var result_wrapper:any={};
        var page_index=0;
        var allinone="";
        if (this.relative){
          //if relative == true then we call relativengrams
            result=getRelativeNgrams(text,this.delimiter,this.n);
            if(text.length>1){
                text.forEach((element:any)=>{
                  allinone+=(element.page_text);
                });
                  var mypages:Pages[]=[];
                mypages.push(new Pages(0,"NONE",allinone,"Allinone",true));
                var result_all = getRelativeNgrams(mypages,this.delimiter,this.n);
                result_wrapper["All"]=result_all;
            }
        }
        else{
          //if relative==false then we call absolutengrams
          result=getAbsoluteNGrams(text,this.delimiter,this.n);
          if(text.length>1){
            text.forEach((element:any)=>{
              allinone+=(element.page_text);
            });
              var mypages:Pages[]=[];
            mypages.push(new Pages(0,"NONE",allinone,"Allinone",true));
            var result_all = getAbsoluteNGrams(mypages,this.delimiter,this.n);
            result_wrapper["All"]=result_all;
        }
        }
        result.forEach((element:any) =>{
          page_index++;
          result_wrapper["Page"+page_index]=element;
         
        });
        var huge_object:any=[];
        var object_keys=(Object.keys(result_wrapper));
        //calculationg for all pages combined
        object_keys.forEach(my_key=>{
          if(my_key=="All"){
          
            var ngram_keys=(Object.keys(result_wrapper[my_key][0][0]));
            var ngram_values=(Object.values(result_wrapper[my_key][0][0]));
            for(var i=0;i<ngram_keys.length;i++){
                huge_object.push({Page:my_key,element:ngram_keys[i],frequency:ngram_values[i],name:"Frequency of text elements"})
            }
           
          }
          else{
          
          var ngram_keys=(Object.keys(result_wrapper[my_key][0]));
          var ngram_values=(Object.values(result_wrapper[my_key][0]));
          for(var i=0;i<ngram_keys.length;i++){
            huge_object.push({Page:my_key,element:ngram_keys[i],frequency:ngram_values[i],name:"Frequency of text elements"})
        }
          
        }
        })
         
        
        return huge_object;
      }
     
  }
  
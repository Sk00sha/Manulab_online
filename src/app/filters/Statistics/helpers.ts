import { Pages } from "src/app/models/pages";
export function countNGram(text:string,delimiter:string,n:number){
    var ngrams:any= {};
    // split by delimitter
    if(delimiter == ""){
        var pieces_all = text.split('');
    } else {
        var pieces_all = text.split(delimiter);
    }
    //$sum = 0;
    for (let i = 0; i < pieces_all.length - (n-1); i++) {
        let piece:string = "";
        for(let j=0; j < n; j++){
            piece += pieces_all[i+j];
        }
        if(ngrams.hasOwnProperty(piece)){
            ngrams[piece]+=1;
        }
        else{
            ngrams[piece]=1;
        }
        //$sum++;
    }

    
    return ngrams;
}
export function getAbsoluteNGrams(pages:Pages[],delimiter:string,n:number):any {
    var result:any = [];
    var allInOne = "";

   pages.forEach((element)=>{
    result.push([countNGram(element.page_text,delimiter,n)]);
    });
   
    return result
}
export function getRelativeNgrams(pages:Pages[],delimiter:string,n:number):any {
    var result:any = [];
    
   pages.forEach((element)=>{
    const sumValues = sum(countNGram(element.page_text,delimiter,n))
    const data=countNGram(element.page_text,delimiter,n)
    Object.keys(data).map(function(key, index) {
        data[key] /= sumValues;
      });
      result.push([data])
    
    });
    return result
}

function sum(obj:any) {
    return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
  }

export function indexOfCoincidenceDirect(normalize:boolean,pages:Pages[],delimiter:string,n:number) {
    var res:any = [];
    var frequency  = getAbsoluteNGrams(pages, delimiter,n);
    frequency.forEach((element:any)=>{
        var ic = 0;
        var elements = 0;
        var tot = 0;
        Object.keys(element).forEach(function(key, index) {
            var localdata=element[key];
    
            Object.keys(localdata).forEach((key,index)=>{
                var val=localdata[key];
                ic+=val*(val-1)
                elements+=val;
                tot++;
            })
            ic /= elements * (elements -1);
            if(normalize){
                ic /= tot;
            }
            res.push(ic);
          });
        
    })
    return res;
}

export function indexOfCoincidenceApprox(normalize:boolean,pages:Pages[],delimiter:string,n:number) {
    var res:any = [];
    var frequency =getRelativeNgrams(pages, delimiter,n);

    frequency.forEach((element:any)=>{
        var ic = 0;
        var tot = 0;
        Object.keys(element).forEach(function(key, index) {
            var localdata=element[key];
        
            Object.keys(localdata).forEach((key,index)=>{
                var val=localdata[key];
                ic+=val*val;
                tot++;
            })
            if(normalize){
                ic /= tot;
            }
            res.push(ic);
          });
        
    })
    return res;
}

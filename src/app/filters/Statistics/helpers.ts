import { Pages } from "src/app/models/pages";
export function countNGram(text:string,delimiter:string,n:number){
    var ngrams:any= {};
    // split by delimitter
    if(delimiter == ""){
        var pieces_all = text.split('');
    } else {
        var pieces_all = text.split(delimiter);
    }
 
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

export function findPosition(where:string, pattern:string):number[]{
    var seachLen = pattern.length;
    if (seachLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    while ((index = where.indexOf(pattern, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + seachLen;
    }
    return indices;
}
function ord(str:string){return str.charCodeAt(0);}

export function CountContacts(page:string,delimiter:string){
        var n=2;
        var ngrams:any={};
        if(delimiter == ""){
            var pieces_all = page.split("");
        } else {
            var pieces_all = page.split(delimiter);
        }
        for(let i=0;i<pieces_all.length-n-1;i++){
            var piece=pieces_all[i]+pieces_all[i+1];
            if(ord(pieces_all[i])>ord(pieces_all[i+1])){
                piece=piece.split("").reverse().join("");
            }
            if(ngrams.hasOwnProperty(piece)){
                ngrams[piece]+=1;
            }
            else{
                ngrams[piece]=1;
            }
        }
        var piece=pieces_all[n-1]+pieces_all[0]; // connect last and first
        if(ord(pieces_all[n-1])>ord(pieces_all[0])){
            piece=piece.split("").reverse().join("");
        }
        if(ngrams.hasOwnProperty(piece)){
            ngrams[piece]+=1;
        }
        else{
            ngrams[piece]=1;
        }

        return ngrams;
       
}
function sum_array(array:number[]){
    return array.reduce((a, b) => a + b, 0)
}

export function findDistances(text:string, symbols:string,delimiter:string){
    var result = [];
    // split by delimitter
    if(delimiter == ""){
        var pieces_all = text.split("");
    } else {
        var pieces_all = text.split(delimiter);
    }
    var positions:any = {};
    for(let i=0;i<pieces_all.length;i++){
        var piece = pieces_all[i];
        if(!positions.hasOwnProperty(piece)){
            positions[piece]=[];
        }
        positions[piece].push(i);
    }
    for(var element in positions){
        if(positions[element].length>1){
            var res_key:any = {};
                // find the distances
            var distances = [];
         for(let i=1; i <positions[element].length; i++){
                var distance = positions[element][i] - positions[element][i-1];
                distances.push(distance);
         }
         res_key['avg'] = sum_array(distances) / distances.length;
         res_key['min'] = Math.min.apply(Math,distances);
         res_key['max'] = Math.max.apply(Math, distances);
         res_key['distances'] = distances;
         result.push(res_key);
        }
        
    }
    return result;
}



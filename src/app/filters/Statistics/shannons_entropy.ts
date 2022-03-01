import { getRelativeNgrams } from 'src/app/filters/Statistics/helpers';
import { Pages } from 'src/app/models/pages';

export class shannons_entropy {
  delimiter:string;
  n:number;
    constructor(delimiter:string,n:number) {
      this.delimiter=delimiter;
      this.n=n;
    }
      activate(text:Pages[]):any {
        var res:any = [];
        var page_index=0;
        var frequency = getRelativeNgrams(text,this.delimiter,this.n);
        frequency.forEach((element:any)=>{
            var entropy = 0;
            page_index++;
            Object.keys(element).forEach(function(key, index) {
                var localdata=element[key];
                Object.keys(localdata).forEach((key,index)=>{
                    var val=localdata[key];
                    entropy -= val * Math.log(val) / Math.log(2);
                })
              });
              res.push({Page:"Page"+page_index,Entropy:entropy,name:"Entropy"});
            
        })
        if(text.length>1){
          var allinone="";
          text.forEach((element:any)=>{
            allinone+=(element.page_text);
          });
          var pages:Pages[]=[];
          pages.push(new Pages(0,"NONE",allinone,"Allinone",true));
          var frequency = getRelativeNgrams(pages,this.delimiter,this.n);
          frequency.forEach((element:any)=>{
              var entropy = 0;
              Object.keys(element).forEach(function(key, index) {
                  var localdata=element[key];
                  Object.keys(localdata).forEach((key,index)=>{
                      var val=localdata[key];
                      entropy -= val * Math.log(val) / Math.log(2);
                  })
                });
                res.push({Page:"All",Entropy:entropy,name:"Entropy"});
          })
        }
            
        return res;
        }
        
    }

    
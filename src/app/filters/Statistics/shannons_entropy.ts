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
        var res:any = {};
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
            res["Page"+page_index]=(entropy);
        })
            
        return res;
        }
        
    }

    
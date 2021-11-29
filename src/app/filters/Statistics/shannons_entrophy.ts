import { getRelativeNgrams } from 'src/app/filters/Statistics/helpers';
import { Pages } from 'src/app/models/pages';

export class shannons_entrophy {
    constructor() {
        
      }
      activate(text:Pages[],relative:boolean,delimiter:string,n:number):any {
        var res:any = [];
        var frequency = getRelativeNgrams(text, delimiter,n);

        frequency.forEach((element:any)=>{
            var entropy = 0;
            Object.keys(element).forEach(function(key, index) {
                var localdata=element[key];
                console.log(localdata);
                Object.keys(localdata).forEach((key,index)=>{
                    var val=localdata[key];
                    entropy -= val * Math.log(val) / Math.log(2);
                })
              });
            res.push(entropy);
        })
            
        return res;
        }
        
    }

    
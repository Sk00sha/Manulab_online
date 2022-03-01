import { Pages } from 'src/app/models/pages';
import { remove_accents } from 'src/app/filters/text operations/remove_accents';
import { AdjacentContacts } from 'src/app/filters/Statistics/adjacent_contacts';

export class VowelDetection{
    method:string="";
    keepSpace:boolean=false;
    constructor(method:string){
        this.method=method;
    }
    activate(pages:Pages[]){
            if (this.method != null) {
               switch (this.method){
                    case  "Sukhotin" : {
                        return this.vowelDetectionSukhotin(pages);
                    } break;
                    case "VowelSolution" : {
                        return this.vowelDetectionVowelSolution(pages);
                    } break;
                    case "ConsonantLine": {
                        return this.vowelDetectionConsonantLine();
                    } break;
               }
            }
    
            return "unsupported vowel detection method.";
        }

        vowelDetectionConsonantLine(){

        }
        vowelDetectionVowelSolution(text:Pages[]){
            var rem_accents=new remove_accents(this.keepSpace,text);

        }
        vowelDetectionSukhotin(text:Pages[]){
            var n = 1;
            var delimiter = '';
            var rem_accents=new remove_accents(this.keepSpace,text);
            var new_pages=rem_accents.activate();

            var ac=new AdjacentContacts(delimiter);
            var contacts=ac.activate(new_pages);
            contacts.forEach((element:any)=>{
                if(element.element[0]==element.element[1]){
                    delete contacts[element];
                }
            });
            var rowSum:any = {};
            contacts.forEach((element:any)=>{
                rowSum[element.element[0]]=!(element.element[0] in rowSum)?element.frequency:rowSum[element.element[0]]+element.frequency;
                rowSum[element.element[1]]=!(element.element[1] in rowSum)?element.frequency:rowSum[element.element[1]]+element.frequency;
            });
           var vowels:any={};
           do{
            var maxKey=Object.keys(rowSum).reduce((a, b) => rowSum[a] > rowSum[b] ? a : b);
           if( rowSum[maxKey]<= 0){
            break;
        }
        var maxKey=Object.keys(rowSum).reduce((a, b) => rowSum[a] > rowSum[b] ? a : b);
        vowels[maxKey[0]]=0;
        contacts.forEach((element:any)=>{
            if (element.element[0] == maxKey[0]) {
                rowSum[element.element[1]] -= 2 * element.frequency;
            } else if(element.element[1] == maxKey[0]){
                rowSum[element.element[0]] -= 2 * element.frequency;
            }
        });
        console.log(vowels);
        
    }while(rowSum[maxKey] > 0);
    return vowels;
    }
}
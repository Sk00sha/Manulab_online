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
            contacts.forEach((element:any)=>console.log(element));
        }
}
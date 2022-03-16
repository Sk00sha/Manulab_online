import { remove_accents } from 'src/app/filters/text operations/remove_accents';
import { Pages } from 'src/app/models/pages';

export class AnagramDetection{
    compare_pattren:Pages[];
    constructor(compare_pattren:string){
            this.compare_pattren=[new Pages(0,'placeholder',compare_pattren,'placeholder',true)];
    }
    activate(pages:Pages[]):any{
        //TODO
        var result:any=[];
        var page_iterator=1;
        var input_rem_accents=new remove_accents(false,this.compare_pattren);
        var input_pages=input_rem_accents.activate();
        var pages_rem_accents=new remove_accents(false,pages);
        var updated_pages=pages_rem_accents.activate();
        updated_pages.forEach(page=>{
            if(page.page_text.length != input_pages[0].page_text.length){
                result.push({Page:"Page"+page_iterator,Anagram:false,name:"Anagram detection"});
                page_iterator++;
            }
            else{
                var part1 = page.page_text.split("");
                var part2 = input_pages[0].page_text.split("");
                part1=part1.sort();
                part2=part2.sort();
        for (let i = 0; i < part1.length; i++) {
            if(part1[i]!= part2[i]){
                result.push({Page:"Page"+page_iterator,Anagram:false,name:"Anagram detection"});
            }
        }
        result.push({Page:"Page"+page_iterator,Anagram:true,name:"Anagram detection"});
        page_iterator++;
            }
        })
        console.log(result);
        
       return result;
    }
}
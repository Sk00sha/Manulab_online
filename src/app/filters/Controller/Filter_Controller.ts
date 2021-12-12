import { Pages } from "src/app/models/pages";
import { remove_accents } from 'src/app/filters/text operations/remove_accents';
import { countNGram } from 'src/app/filters/Statistics/helpers';
import { getAbsoluteNGrams } from 'src/app/filters/Statistics/helpers';
import { getRelativeNgrams } from 'src/app/filters/Statistics/helpers';
import { frequency_of_text_elements } from 'src/app/filters/Statistics/frequency_of_text_elements';
import { shannons_entropy } from 'src/app/filters/Statistics/shannons_entropy';
import { index_of_coincidence } from 'src/app/filters/Statistics/index_of_coincidence';
import { pattern_search } from 'src/app/filters/Statistics/pattern_search';
import { findPosition } from 'src/app/filters/Statistics/helpers';
import { CountContacts } from 'src/app/filters/Statistics/helpers';
import { AdjacentContacts } from 'src/app/filters/Statistics/adjacent_contacts';
import { findDistances } from 'src/app/filters/Statistics/helpers';
import { LetterDistances } from 'src/app/filters/Statistics/letter_distances';


export class FilterController{
    pages_for_analysis:Pages[]=[];
    filters:any=[];
    constructor(pages:Pages[]){
        this.pages_for_analysis=pages;
    }
    all_filters:string[]=["Remove accents","Frequency of text elements",'Index of coincidence','Shannons entrophy'
  ,'Pattern search','Adjacent contacts','Text element distances',"Anagram detection",'Vowel detection','Language guess'];

    add_filter_to_stack(filter_name:any){
        
        if (filter_name.name=="Shannons entrophy"){
            console.log("Added shannons entrophy")
            var enth= new shannons_entropy(filter_name.delimiter,filter_name.n);
            this.filters.push(enth);
        }
        if (filter_name.name=="Frequency of text elements"){
            console.log("Added frequency of text elements")
            var freq= new frequency_of_text_elements(filter_name.relative,filter_name.delimiter,filter_name.n);
            this.filters.push(freq);
        }
        if(filter_name.name=="Index of coincidence"){
            var index_of_coinc=new index_of_coincidence(true,true,"",1);
        }
        if(filter_name.name=="Pattern search"){
            var patt_search=new pattern_search("patt");
        }
        if(filter_name.name=="Adjacent contacts"){
            var adjacent_contacts=new AdjacentContacts("");
        }
        if(filter_name.name=="Text element distances"){
            var letter_distances=new LetterDistances("",1);
        }
        if(filter_name.name=="Remove accents"){
            var remove_accent=new remove_accents();
            this.filters.push(remove_accent)
        }
        
        if(filter_name.name=="Anagram detection"){

        }
        if(filter_name.name=="Vowel detection"){

        }
        if(filter_name.name=="Language guess"){

        }
    }
    add_multiple_filters(array_of_filters:any[]){
        for(var item in array_of_filters){
            console.log(array_of_filters[item]);
            
            this.add_filter_to_stack(array_of_filters[item]);
        }
    }
    start_analysis(){
        console.log("starting analysis:");
        var result:any[]=[];
        var index:number=0;
        this.filters.forEach((filter:any)=>{
            console.log(filter.activate(this.pages_for_analysis));
            result.push(filter.activate(this.pages_for_analysis));
            });
            return result;
    }


}
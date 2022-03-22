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
import { LanguageGuess } from 'src/app/filters/Cryptanalysis/language_guess';
import { AnagramDetection } from "../Cryptanalysis/anagram_detection";
import { VowelDetection } from "../Cryptanalysis/vowel_detection";

export class FilterController{
    pages_for_analysis:Pages[]=[];
    filters:any=[];
    constructor(pages:Pages[]){
        this.pages_for_analysis=pages;
    }
    all_filters:string[]=["Remove accents","Frequency of text elements",'Index of coincidence','Shannons entropy'
  ,'Pattern search','Adjacent contacts','Text element distances',"Anagram detection",'Vowel detection','Language guess'];

    add_filter_to_stack(filter_name:any){
        
        if (filter_name.name=="Shannons entropy"){
            console.log("Added shannons entropy")
            var enth= new shannons_entropy(filter_name.delimiter,filter_name.n);
            this.filters.push({name:filter_name.name,function:enth});
        }
        if (filter_name.name=="Frequency of text elements"){
            console.log("Added frequency of text elements")
            var freq= new frequency_of_text_elements(filter_name.relative,filter_name.delimiter,filter_name.n);
            this.filters.push({name:filter_name.name,function:freq});
        }
        if(filter_name.name=="Index of coincidence"){
            var index_of_coinc=new index_of_coincidence(filter_name.approx,filter_name.normalize,filter_name.delimiter,filter_name.n);
            this.filters.push({name:filter_name.name,function:index_of_coinc});
        }
        if(filter_name.name=="Pattern search"){
            var patt_search=new pattern_search(filter_name.pattern);
            this.filters.push({name:filter_name.name,function:patt_search});
        }
        if(filter_name.name=="Adjacent contacts"){
            var adjacent_contacts=new AdjacentContacts(filter_name.delimiter);
            this.filters.push({name:filter_name.name,function:adjacent_contacts});
        }
        if(filter_name.name=="Text element distances"){
            var letter_distances=new LetterDistances(filter_name.delimiter,filter_name.n);
            this.filters.push({name:filter_name.name,function:letter_distances});
        }
        if(filter_name.name=="Remove accents"){
            var remove_accent=new remove_accents(filter_name.Spaces,this.pages_for_analysis);
            this.filters.push({name:filter_name.name,function:remove_accent});
        }
        
        if(filter_name.name=="Anagram detection"){
            var anag_detection=new AnagramDetection(filter_name.pattern);
            this.filters.push({name:filter_name,function:anag_detection});
        }
        if(filter_name.name=="Vowel detection"){
                var vow_detection=new VowelDetection(filter_name.vowel_option);
                this.filters.push({name:vow_detection,function:vow_detection});
        }
        if(filter_name.name=="Language guess"){
            var l_g=new LanguageGuess();
            this.filters.push({name:filter_name.name,function:l_g});
        }
    }
    add_multiple_filters(array_of_filters:any[]){
        for(var item in array_of_filters){
            this.add_filter_to_stack(array_of_filters[item]);
        }
    }
    start_analysis(){
        var result:any[]=[];
        var transformation:boolean=false;
        var new_pages:Pages[]=[];
        this.filters.forEach((filter:any)=>{
            
            if(filter.name=="Remove accents"){
               // console.log("Removing accents");
                new_pages=filter.function.activate();
                transformation=true;
                result.push([{name:"Remove accents"}]);
            }
            if(transformation && filter.name!="Remove accents"){
               // console.log("Removing accents pages used");
                result.push(filter.function.activate(new_pages));
            }
            else if(filter.name!="Remove accents"){
                result.push(filter.function.activate(this.pages_for_analysis));
            }
            
            });
            return result;
    }


}
import { index_of_coincidence } from 'src/app/filters/Statistics/index_of_coincidence';
import { Pages } from 'src/app/models/pages';
import { remove_accents } from 'src/app/filters/text operations/remove_accents';

export class LanguageGuess{
    IC_LANGUAGES:any={
        "Italian" : 0.0738,
        "French" : 0.0694,
        "Russian" : 0.0529,
        "English" : 0.0667,
        "German" : 0.0734,
        "Spanish" : 0.0729,
        "Portuguese" : 0.0824,
        "Turkish" : 0.0701,
        "Swedish" : 0.0681,
        "Polish" : 0.0607,
        "Danish" : 0.0672,
        "Icelandic" : 0.0669,
        "Finnish" : 0.0699,
        "Czech" : 0.0510,
        "Latin" : 0.0726, // calculated : https://www.sttmedia.com/characterfrequency-latin
        "Random text" : 0.038
    }

    n = 1;
    delimiter = '';
    keepSpace = false;
    normalize = false;
    approximate = false;
    ic=new index_of_coincidence(this.approximate,this.normalize, this.delimiter,this.n);
    
    constructor(){
       
    }
    
    activate(text:Pages[]):any{
        var result:any=[];
        var rem_accents=new remove_accents(this.keepSpace,text);
        var updated_pages=rem_accents.activate();
        console.log(updated_pages[0].page_text);
        var index_of_c=this.ic.activate(updated_pages);
        for (const property in index_of_c) {
          
            var ic=index_of_c[property].Index_of_coincidence;
            for (const lang in this.IC_LANGUAGES) {
                var value=this.IC_LANGUAGES[lang];
                var diff=Math.abs(value-ic).toFixed(4);
                var data={Page:property,Lang:lang,Lang_index:this.IC_LANGUAGES[lang],Difference:diff}
                result.push(data);
              }
          }
          result.sort(compare)
        return result;
    }
}
function compare( a:any, b:any ) {
    if ( a.Difference < b.Difference ){
      return -1;
    }
    if ( a.Difference > b.Difference ){
      return 1;
    }
    return 0;
  }
export class remove_accents {
    constructor() {
        
      }
      activate(text:string,keep_space:boolean) {
        var text_analysis=text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
       
        if(keep_space){
            text_analysis=text_analysis.split(' ').join('');
        }
        return text_analysis
      }
     
  }
  
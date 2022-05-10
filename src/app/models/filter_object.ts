export class FilterObject {
    name?: string;
    delimiter?: string;
    approx?: boolean;
    normalize?: boolean;
    relative?: boolean;
    n?: number;
   Spaces?:boolean;
   pattern?:string;
   vowel_option?:string;
   group_id?:number;
   constructor(name?: string,
    delimiter?: string,
    approx?: boolean,
    normalize?: boolean,
    relative?: boolean,
    n?: number,
   Spaces?:boolean,
   pattern?:string,
   vowel?:string,
   g_id?:number){
this.name=name;
this.delimiter=delimiter;
this.approx=approx;
this.normalize=normalize;
this.relative=relative;
this.n=n;
this.Spaces=Spaces;
this.pattern=pattern;
this.vowel_option=vowel;
this.group_id=g_id;
  }
    
  }
  
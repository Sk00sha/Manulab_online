import { Pages } from 'src/app/models/pages';
import { indexOfCoincidenceDirect } from './helpers';
import { indexOfCoincidenceApprox } from './helpers';
import { Filter } from "../Filter";
export class index_of_coincidence extends Filter{
  approx: boolean;
  normalize:boolean;
  delimiter: string;
  n: number;

  constructor(approx: boolean,normalize:boolean, delimiter: string, n: number) {
    super();
    this.delimiter=delimiter;
    this.approx=approx;
    this.n=n;
    this.normalize=normalize;
  }

  activate(text: Pages[]): any {
    //determine if we want to approximate IC or not
    if (!this.approx) {
      var ic = indexOfCoincidenceDirect(this.normalize, text, this.delimiter, this.n);
      ic.forEach((element:any)=>element.name="Index of coincidence");
    } else {
        var ic=indexOfCoincidenceApprox(this.normalize,text,this.delimiter,this.n);
        ic.forEach((element:any)=>element.name="Index of coincidence");
    }
    return ic;
  }
}

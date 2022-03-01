import { Pages } from 'src/app/models/pages';
import { indexOfCoincidenceDirect } from './helpers';
import { indexOfCoincidenceApprox } from './helpers';

export class index_of_coincidence {
  approx: boolean;
  normalize:boolean;
   delimiter: string;
    n: number;
  constructor(approx: boolean,normalize:boolean, delimiter: string, n: number) {
    this.delimiter=delimiter;
    this.approx=approx;
    this.n=n;
    this.normalize=normalize;
  }
  activate(text: Pages[]): any {
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

import { Pages } from 'src/app/models/pages';
import { indexOfCoincidenceDirect } from './helpers';
import { indexOfCoincidenceApprox } from './helpers';

export class index_of_coincidence {
  constructor() {}
  activate(text: Pages[], approx: boolean, delimiter: string, n: number): any {
    if (!approx) {
      var ic = indexOfCoincidenceDirect(true, text, delimiter, n);
    } else {
        var ic=indexOfCoincidenceApprox(true,text,delimiter,n);
    }
    return ic;
  }
}

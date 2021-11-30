
import { Pages } from "src/app/models/pages";
import { countNGram } from "./helpers";
import { findDistances } from "./helpers";
export class LetterDistances{
    constructor(){

    }
    activate(pages:Pages[],delimiter:string){
        var result:any = [];
        var allInOne = "";
        var n = 1;
        
        pages.forEach(element => {
            var frequency=countNGram(element.page_text,delimiter,1);
            var distances = findDistances(element.page_text,"unique",delimiter);
            if (distances.length!=0) {
                result.push([distances]);
            }
        });
        /*
        // by page
            
        }

        if(sizeof($this->pages) > 1){
            foreach($this->pages as $page => $page_value) {
                $allInOne .= $page_value;
                $allInOne .= $this->delimiter;
            }
            $allInOne = trim($allInOne);
            // all in one
            $frequency = $this->countNGram($allInOne);
            $unique = array_unique($frequency);
            $distances = $this->findDistances($allInOne, $unique);
            if (!empty($distances)) {
                $result['all'] = $distances;
            }
        }*/
        return result;
    }
}
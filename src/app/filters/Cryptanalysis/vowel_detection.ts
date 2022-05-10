import { Pages } from 'src/app/models/pages';
import { remove_accents } from 'src/app/filters/text operations/remove_accents';
import { AdjacentContacts } from 'src/app/filters/Statistics/adjacent_contacts';
import { getRelativeNgrams } from 'src/app/filters/Statistics/helpers';
import { getAbsoluteNGrams } from 'src/app/filters/Statistics/helpers';
import { Filter } from "../Filter";
export class VowelDetection extends Filter {
  method: string = '';
  keepSpace: boolean = false;
  constructor(method: string) {
    super();
    this.method = method;
  }
  activate(pages: Pages[]) {
    if (this.method != null) {
      switch (this.method) {
        case 'Sukhotin':
          {
            return this.vowelDetectionSukhotin(pages);
          }
          break;
        case 'VowelSolution':
          {
            return this.vowelDetectionVowelSolution(pages);
          }
          break;
        case 'ConsonantLine':
          {
            return this.vowelDetectionConsonantLine(pages);
          }
          break;
      }
    }

    return 'unsupported vowel detection method.';
  }

  vowelDetectionConsonantLine(text: Pages[]) {
    
    var rem_accents = new remove_accents(this.keepSpace, text);
    var updated_texts = rem_accents.activate();
    var final_results: any = [];
    var Page_iterator = 1;
    updated_texts.forEach((updated_text) => {
      var result: any = {};
      var monograms = getAbsoluteNGrams([updated_text], '', 1);
      var variety: any = this.variety_of_contact([updated_text]);
      const sumValues = (variety: any) =>
        Object.values(variety).reduce((a: any, b: any) => a + b);
      var suma: any = sumValues(variety);
    
      variety = this.sort_obj_asc(variety);
      suma=suma * 0.2

      var count = 0;
      var consonants = [];
      var length_iterator = 0;
    
      
      for (let index = 0; index < variety.length; index++) {
        count += variety[index][1];
        if (count > suma) {
          break;
        }
        consonants.push(variety[index][0]);
        
      }
      
      

      variety = this.recreate_obj(variety);
      var array_keys = Object.keys(variety);
      var tmpval = 1;
      //variety=this.sort_obj_asc(variety);
      for (let index = consonants.length; index < monograms.length; index++) {
        if (variety[array_keys[index]] == variety[array_keys[index + 1]]) {
          tmpval++;
        } else break;
      }
      
      
      for (let index = 0; index < tmpval; index++) {
        if (
          variety[array_keys[consonants.length + 1]] -
            monograms[0][0][array_keys[consonants.length + 1]] <
          0
        ) {
          consonants.push(array_keys[consonants.length + 1]);
        }
      }

      var from_left = this.left_contact([updated_text], consonants);
      var from_right = this.right_contacts([updated_text], consonants);
      
      
      from_left = Object.keys(from_left).map(function (key) {
        return [key, from_left[key]];
      });
     
      
      for (let index = 0; index < from_left.length; index++) {
        if (!(from_left[index][0] in result)) {
          result[from_left[index][0]] = from_left[index][1];
        } else {
          result[from_left[index][0]] += from_left[index][1];
        }
      }
      from_right = Object.keys(from_right).map(function (key) {
        return [key, from_right[key]];
      });
      
      
      
      for (let index = 0; index < from_right.length; index++) {
        if (!(from_right[index][0] in result)) {
          result[from_right[index][0]] = from_right[index][1];
        } else {
          result[from_right[index][0]] += from_right[index][1];
        }
      }

      var counter = 0;
      var final_result = [];
      
      
      //( Object.keys(result).map(function (key) {return [key, result[key]]}));
      
       while (counter < 6) {
        let arr:any = Object.values(result);
        let max = Math.max(...arr);
        var maxKey_max: any = this.getKeyByValue(result, max);
        final_result.push(maxKey_max);
        result[maxKey_max]=0;
        counter++;
      }
      
      
      for (let index = 0; index < final_result.length; index++) {
        final_results.push({
          Page: 'Page' + Page_iterator,
          vowel: final_result[index],
          vowel_count: 1,
          name: 'Vowel detection',
        });
      }
      Page_iterator += 1;
    });
    return final_results;
  }

  sortObjectByKeys(o: any) {
    return Object.keys(o)
      .sort()
      .reduce((r: any, k: any) => ((r[k] = o[k]), r), {});
  }

  variety_of_contact(pages: Pages[]) {
    var contact_letters: any = {};
    var return_contacts: any = {};
    var bigrams = getAbsoluteNGrams(pages, '', 2);
    bigrams = bigrams[0][0];
    bigrams = Object.keys(bigrams).map(function (key) {
      return [key, bigrams[key]];
    });
    

    for (let index = 0; index < bigrams.length; index++) {
      if (!(bigrams[index][0][0] in contact_letters)) {
        contact_letters[bigrams[index][0][0]] = [];
        contact_letters[bigrams[index][0][0]].push(bigrams[index][0][1]);
      } else if (
        !contact_letters[bigrams[index][0][0]].includes(bigrams[index][0][1])
      ) {
        contact_letters[bigrams[index][0][0]].push(bigrams[index][0][1]);
      }
    }

    contact_letters = Object.keys(contact_letters).map(function (key) {
      return [key, contact_letters[key]];
    });
    for (let index = 0; index < contact_letters.length; index++) {
      return_contacts[contact_letters[index][0]] =
        contact_letters[index][1].length;
    }
    return return_contacts;
  }

  vowelDetectionVowelSolution(text: Pages[]) {
    var rem_accents = new remove_accents(this.keepSpace, text);
    var updated_texts = rem_accents.activate();
    
    var full_result: any = [];
    var Page_iterator = 1;
    updated_texts.forEach((updated_text: any) => {
      var first_pointer = this.first_pointer([updated_text]);
      var second_pointer = this.second_pointer([updated_text]);
      var third_pointer = this.third_pointer([updated_text]);
      var fourth_pointer = this.fourth_pointer([updated_text]);
      var fifth_pointer = this.fifth_pointer([updated_text]);
      var sixth_pointer = this.sixth_pointer([updated_text]);
      var eight_pointer = this.eight_pointer([updated_text]);
      var array_of_vowels = [
        first_pointer,
        second_pointer,
        third_pointer,
        fourth_pointer,
        fifth_pointer,
        sixth_pointer,
        eight_pointer,
      ];
  

      var vowel_object: any = {};
      var alltogether = first_pointer.concat(
        second_pointer,
        third_pointer,
        fourth_pointer,
        fifth_pointer,
        sixth_pointer,
        eight_pointer
      );
      for (let i = 0; i < alltogether.length; i++) {
        if (!(alltogether[i] in vowel_object)) {
          vowel_object[alltogether[i]] = 1;
        } else {
          vowel_object[alltogether[i]] += 1;
        }
      }

      var counter = 0;
      var result = [];
     

      while (counter < 6) {
        vowel_object = this.sort_obj(vowel_object);
        var maxkey = vowel_object[0][0];
        result.push(maxkey);
       
        vowel_object = this.recreate_obj(vowel_object);
        vowel_object[maxkey] = 0;
        counter++;
      }
      for (let index = 0; index < result.length; index++) {
        full_result.push({
          Page: 'Page' + Page_iterator,
          vowel: result[index],
          vowel_count: 1,
          name: 'Vowel detection',
        });
      }
      Page_iterator += 1;
    });

    return full_result;
  }
  arrayRemove(arr: any, value: any) {
    return arr.filter(function (ele: any) {
      return ele != value;
    });
  }
  vowelDetectionSukhotin(text: Pages[]) {
    var n = 1;
    var Page_iterator = 1;
    var delimiter = '';
    var rem_accents = new remove_accents(this.keepSpace, text);

    var new_pages = rem_accents.activate();
    var results: any = [];

    var ac = new AdjacentContacts(delimiter);
    new_pages.forEach((page) => {
      var contacts = ac.activate([page]);

      contacts.forEach((element: any) => {
        if (element.element[0] == element.element[1]) {
          contacts = this.arrayRemove(contacts, element);
        }
      });

      var rowSum: any = {};
      contacts.forEach((element: any) => {
        rowSum[element.element[0]] = !(element.element[0] in rowSum)
          ? element.frequency
          : rowSum[element.element[0]] + element.frequency;
        rowSum[element.element[1]] = !(element.element[1] in rowSum)
          ? element.frequency
          : rowSum[element.element[1]] + element.frequency;
      });

      var vowels: any = [];
      do {
        if (this.sort_obj(rowSum)[0][1] <= 0) {
          break;
        }
        let arr: any = Object.values(rowSum);
        let max = Math.max(...arr);
        var maxKey_max: any = this.getKeyByValue(rowSum, max);
        vowels.push(maxKey_max);

        rowSum[maxKey_max] = 0;

        contacts.forEach((element: any) => {
          if (element.element[0] == maxKey_max) {
            rowSum[element.element[1]] -= 2 * element.frequency;
          } else if (element.element[1] == maxKey_max) {
            rowSum[element.element[0]] -= 2 * element.frequency;
          }
        });
      } while (this.sort_obj(rowSum)[0][1] > 0);
      for (let index = 0; index < vowels.length; index++) {
        results.push({
          Page: 'Page' + Page_iterator,
          vowel: vowels[index],
          vowel_count: 1,
          name: 'Vowel detection',
        });
      }

      Page_iterator++;
    });

    return results;
  }
  //helper function returns key for a given value
  getKeyByValue(object: any, value: any) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  //function sorts array
  sort_obj(rowSum: any) {
    var dataArray: any = [];
    for (var o in rowSum) {
      dataArray.push(rowSum[o]);
    }
    var sortable: any = [];
    for (var vehicle in rowSum) {
      sortable.push([vehicle, rowSum[vehicle]]);
    }
    sortable.sort(function (a: any, b: any) {
      return b[1] - a[1];
    });
    return sortable;
  }
  //function sorts array ascending
  sort_obj_asc(rowSum: any) {
    var dataArray: any = [];
    for (var o in rowSum) {
      dataArray.push(rowSum[o]);
    }
    var sortable: any = [];
    for (var vehicle in rowSum) {
      sortable.push([vehicle, rowSum[vehicle]]);
    }
    sortable.sort(function (a: any, b: any) {
      return a[1] - b[1];
    });
    return sortable;
  }
  //when sorted,recreate to object 
  recreate_obj(sorted_arr: any) {
    var rowSum: any = {};
    for (let item of sorted_arr) {
      rowSum[item[0]] = item[1];
    }
    return rowSum;
  }

  max_func(arraySum: any) {
    return Object.keys(arraySum).reduce((a, b) =>
      arraySum[a] > arraySum[b] ? a : b
    );
  }
  //pointer functions used in vowel solution
  first_pointer(pages: Pages[]) {
    var vowels: any = [];
    var frequencies = getRelativeNgrams(pages, '', 1);
    frequencies = frequencies[0][0];
    var frequency: number = 0;
    while (frequency <= 0.6) {
      var max = this.sort_obj(frequencies);
      frequency += parseFloat(max[0][1]);
      max[0][1] = 0;
      vowels.push(max[0][0]);
      frequencies = this.recreate_obj(max);
    }
    return vowels;
  }
  second_pointer(pages: Pages[]) {
    var vowels: any = [];
    var lowfr: any = [];
    var frequencies = getRelativeNgrams(pages, '', 1);
    frequencies = this.sort_obj_asc(frequencies[0][0]);
    var frequency: number = 0;
    while (frequency <= 0.2) {
      var min = frequencies;
      frequency += parseFloat(min[0][1]);
      min[0][1] = 100;
      lowfr.push(min[0][0]);
      frequencies = this.recreate_obj(min);
      frequencies = this.sort_obj_asc(frequencies);
    }
    var vowels_left = this.left_contact(pages, lowfr);

    var vowels_right = this.right_contacts(pages, lowfr);

    vowels_right = this.sort_obj_asc(vowels_right);

    var final_array = vowels_left;

    var recreated_indexer = this.recreate_obj(vowels_right);
    for (let index = 0; index < vowels_right.length; index++) {
      if (vowels_right[index][0] in final_array) {
        final_array[vowels_right[index][0]] += vowels_right[index][1];
      } else {
        final_array[vowels_right[index][0]] = vowels_right[index][1];
      }
    }

    final_array = this.sort_obj_asc(final_array);
    for (let index = 0; index < final_array.length; index++) {
      if (final_array[index][1] / pages[0].page_text.length >= 0.02) {
        vowels.push(final_array[index][0]);
      }
    }

    return vowels;
  }
  left_contact(pages: Pages[], letters: any[]) {
    var contact_letters: any = {};
    var bigrams = getAbsoluteNGrams(pages, '', 2);

    if (typeof letters === 'object' && letters !== null) {
    
      letters = Object.keys(letters).map(function (key: any) {
        return [key, letters[key]];
      });
    }
    
    bigrams = bigrams[0][0];
    bigrams = Object.keys(bigrams).map(function (key: any) {
      return [key, bigrams[key]];
    });
    
    
    for (let index = 0; index < letters.length; index++) {
      for (let j = 0; j < bigrams.length; j++) {
        if (letters[index][1][0] == bigrams[j][0][1]) {
 
          contact_letters[bigrams[j][0][0]] = !(
            bigrams[j][0][0] in contact_letters
          )
            ? 1
            : contact_letters[bigrams[j][0][0]] + 1;
        }
      }
    }

    return contact_letters;
  }
  right_contacts(pages: Pages[], letters: any[]) {
    var contact_letters: any = {};
    var bigrams = getAbsoluteNGrams(pages, '', 2);
    if (typeof letters === 'object' && letters !== null) {
      //letters = this.sort_obj_asc(letters);
      letters = Object.keys(letters).map(function (key: any) {
        return [key, letters[key]];
      });
    }
   
    bigrams = bigrams[0][0];
    bigrams = Object.keys(bigrams).map(function (key: any) {
      return [key, bigrams[key]];
    });
  
    
    
    for (let index = 0; index < letters.length; index++) {
      for (let j = 0; j < bigrams.length; j++) {
        if (letters[index][1][0] == bigrams[j][0][0]) {
        
          contact_letters[bigrams[j][0][1]] = !(
            bigrams[j][0][1] in contact_letters
          )
            ? 1
            : (contact_letters[bigrams[j][0][1]] += 1);
        }
      }
    }

    return contact_letters;
  }
  third_pointer(pages: Pages[]) {
    var vowels: any = [];
    var frequencies = getRelativeNgrams(pages, '', 1);
    frequencies = frequencies[0][0];
    frequencies = Object.keys(frequencies).map(function (key) {
      return [key, frequencies[key]];
    });
    var frequency: number = 0;
    for (let index = 0; index < frequencies.length; index++) {
      var tmp_array = [];
      tmp_array.push(frequencies[index][0]);
      var vowels_left = this.left_contact(pages, tmp_array);
      var vowels_right = this.right_contacts(pages, tmp_array);
      var final_array = vowels_left;
      vowels_right = Object.keys(vowels_right);
      for (let index = 0; index < vowels_right.length; index++) {
        if (vowels_right[index] in final_array) {
        } else {
          final_array[vowels_right[index]] = 1;
        }
      }

      var count = this.sort_obj(final_array).length;

      vowels.push([frequencies[index][0], count]);
    }
    vowels = this.recreate_obj(vowels);
   

    var counter = 0;
    var result = [];
    while (counter < 6) {
      let arr: any = Object.values(vowels);
      let max = Math.max(...arr);
      var maxKey_max: any = this.getKeyByValue(vowels, max);
     
      result.push(maxKey_max);
      vowels[maxKey_max] = 0;
      counter++;
    }
    return result;
  }
  fourth_pointer(pages: Pages[]) {
    var vowels: any = [];
    var tetragrams = getRelativeNgrams(pages, '', 4);
    //reformat
    tetragrams = tetragrams[0][0];
    tetragrams = this.sort_obj(tetragrams);
    for (let index = 0; index < tetragrams.length; index++) {
      if (
        tetragrams[index][0][0] == tetragrams[index][0][2] &&
        tetragrams[index][0][1] == tetragrams[index][0][3]
      ) {
        vowels.push(tetragrams[index][0][0]);
        vowels.push(tetragrams[index][0][1]);
      }
    }

    return vowels;
  }
  fifth_pointer(pages: Pages[]) {
    var vowels: any = {};
    var bigrams = getRelativeNgrams(pages, '', 2);
    bigrams = bigrams[0][0];
    bigrams = Object.keys(bigrams).map(function (key) {
      return [key, bigrams[key]];
    });

    var bigrams_obj = this.recreate_obj(bigrams);
    for (let index = 0; index < bigrams.length; index++) {
      var reverseKey = bigrams[index][0].split('').reverse().join('');

      if (reverseKey in bigrams_obj) {
        if (!(bigrams[index][0][0] in vowels)) {
          vowels[bigrams[index][0][0]] = 1;
        } else {
          vowels[bigrams[index][0][0]] += 1;
        }
        if (!(bigrams[index][0][1] in vowels)) {
          vowels[bigrams[index][0][1]] = 1;
        } else {
          vowels[bigrams[index][0][1]] += 1;
        }
      }
    }

    var counter = 0;
    var result: any = [];
    while (counter < 6) {
      let arr: any = Object.values(vowels);
      let max = Math.max(...arr);
      var maxKey_max: any = this.getKeyByValue(vowels, max);
      result.push(maxKey_max);
      //vowels = this.sort_obj(vowels);
      // var maxkey = vowels[0][0];
      //result.push(maxkey);
      //vowels = this.recreate_obj(vowels);
      vowels[maxKey_max] = 0;
      counter++;
    }
    return result;
  }
  sixth_pointer(pages: Pages[]) {
    var vowels: any = [];
    var tetragrams = getRelativeNgrams(pages, '', 4);

    tetragrams = tetragrams[0][0];
    tetragrams = this.sort_obj(tetragrams);
    for (let index = 0; index < tetragrams.length; index++) {
      if (tetragrams[index][0][1] == tetragrams[index][0][2]) {
        vowels.push(tetragrams[index][0][0]);
        vowels.push(tetragrams[index][0][3]);
      }
    }
    return vowels;
  }
  eight_pointer(pages: Pages[]) {
    var vowels: any = {};
    var relativefreq = getRelativeNgrams(pages, '', 1);
    relativefreq = this.sort_obj(relativefreq[0][0]);
    var frequency = 0;
    var tmpArr = [];

    while (frequency <= 0.6) {
      var max = relativefreq;
      tmpArr.push(max[0][0]);
      frequency += parseFloat(max[0][1]);
      relativefreq = this.recreate_obj(relativefreq);
      relativefreq[max[0][0]] = 0;
      relativefreq = this.sort_obj(relativefreq);
    }
    var relativefreq = getRelativeNgrams(pages, '', 2);
    relativefreq = relativefreq[0][0];
    var relativefrequency = this.sort_obj(relativefreq).length;

    for (let index = 0; index < tmpArr.length; index++) {
      var firstletter: any = tmpArr[index];
      for (let j = 0; j < tmpArr.length; j++) {
        var secondletter: any = tmpArr[j];
        if (index == j) {
          continue;
        }
        var digram: any = firstletter + secondletter;
        var reversedigram = digram.split('').reverse().join('');
        var tmpval = 0;
        if (digram in relativefreq) {
          tmpval += (relativefreq[digram] / relativefrequency) * 100;
        }
        if (reversedigram in relativefreq) {
          tmpval += (relativefreq[digram] / relativefrequency) * 100;
        }
        if (tmpval < 0.1) {
          if (!(firstletter in vowels)) {
            vowels[firstletter] = 1;
          } else {
            vowels[firstletter] += 1;
          }
          if (!(secondletter in vowels)) {
            vowels[secondletter] = 1;
          } else {
            vowels[secondletter] += 1;
          }
        }
      }
    }
    var results: any = [];
    var sorted_vowels = this.sort_obj(vowels);
    //console.log(sorted_vowels);

    for (let index = 0; index < sorted_vowels.length; index++) {
      if (sorted_vowels[index][1] < tmpArr.length / 2) {
        sorted_vowels.splice(index, 1);
      } else {
        results.push(sorted_vowels[index][0]);
      }
    }
    return results;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DbRequestService {

  readonly ROOT_URL="https://www.cryptograms.hcportal.eu/api/rest/getCryptogramRecordsForManulab.php";
  readonly ROOT_PROXY_URL="https://thingproxy.freeboard.io/fetch/https://www.cryptograms.hcportal.eu/api/rest/getCryptogramRecordsForManulab.php"
  manuscripts:Observable<any>;
  constructor(private http:HttpClient) {}
   fetch_db_data():Promise<any>{
     var data_pages:any=[];
    return this.http.get(this.ROOT_PROXY_URL).pipe(map(res => res)).toPromise();

   }
}

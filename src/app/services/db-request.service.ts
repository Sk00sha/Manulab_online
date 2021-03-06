import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DbRequestService {
  manuscripts: Observable<any>;
  readonly ROOT_URL =
    'https://www.cryptograms.hcportal.eu/api/rest/getCryptogramRecordsForManulab.php';
    
    // sending request through proxy CORS error handling
  readonly ROOT_PROXY_URL =
    'https://thingproxy.freeboard.io/fetch/https://www.cryptograms.hcportal.eu/api/rest/getCryptogramRecordsForManulab.php';

  constructor(private http: HttpClient) {}
  fetch_db_data(): Promise<any> {
    return this.http
      .get(this.ROOT_URL)
      .pipe(map((res) => res))
      .toPromise();
  }
}

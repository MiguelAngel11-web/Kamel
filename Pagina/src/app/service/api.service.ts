import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  alta2(url:string,body:any){
    return this.httpClient.post(url, body).toPromise()
    }
}

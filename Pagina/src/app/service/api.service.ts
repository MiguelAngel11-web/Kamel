import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  alta(url:string,body:any) {
    return this.httpClient.post(url, body).toPromise().catch((err)=>{err});
  }

  iniciarSesion(url:string){
    return this.httpClient.get(url);
  }

  getJuegos(url:string){
    return this.httpClient.get(url);

  }

}

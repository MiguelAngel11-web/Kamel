import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient ) { }

  alta(url:string,body:any) {
    return this.httpClient.post(url, body).toPromise().catch((err)=>{err});
  }

  async iniciarSesion(url:string){
     return await this.httpClient.get(url);
  }

  async getUser(url:string){
    return await this.httpClient.get(url).pipe(first()).toPromise();
  }

  async EmailAndPassword(url:string){
    return await this.httpClient.get(url).toPromise().catch((err)=>{err});
  }
  async login(url:string){
    return await this.httpClient.get(url).toPromise().catch((err)=> err);
  }

}

export interface Usuario{
  user: string;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  correo:string;
  user:any;
  id:any;
  constructor(private httpClient: HttpClient) { }

  alta(url:string,body:any) {
    return this.httpClient.post(url, body).toPromise().catch((err)=>{err});
  }

   CheckMail(url:string){
    return  this.httpClient.get(url);
  }

  async iniciarSesion(url:string){
     return await this.httpClient.get(url);
  }

  async getUser(url:string){
    return await this.httpClient.get(url).toPromise();
  }

  async EmailAndPassword(url:string){
    return await this.httpClient.get(url).toPromise().catch((err)=>{err});
  }
  async login(url:string){

    return await this.httpClient.get(url).toPromise().catch((err)=> err);
  }
  async LogOut(url:string){
    return await this.httpClient.get(url).toPromise();
  }

  async EnviarCorreo(url:string,body:any){
    return await this.httpClient.post(url, body).toPromise().catch((err)=>{err});
  }

  async AgregarProducto(url:string,body:any){
    return await this.httpClient.post(url,body).toPromise();
  }

  async AgregarFavoritos(url:string,body:any){
    return await this.httpClient.post(url,body).toPromise();
  }

  async GetProducto(url:string){
    return await this.httpClient.get(url).toPromise();
  }

  async GetIDUser(url:string){
    return await this.httpClient.get(url).toPromise();
  }

  GetXbox(){
    return this.httpClient.get(`https://kamel-6e19d.firebaseio.com/games.json?orderBy="consola"&equalTo="Xbox One"&print=pretty`)
    .subscribe((data)=>{console.log(data)});
  }


}

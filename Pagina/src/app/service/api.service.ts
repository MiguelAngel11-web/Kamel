import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, public afAuth: AngularFireAuth ) { }

  alta(url:string,body:any) {
    return this.httpClient.post(url, body).toPromise().catch((err)=>{err});
  }

  async iniciarSesion(url:string){
     return await this.httpClient.get(url);
  }

  async getUser(url:string){
    return await this.httpClient.get(url).toPromise().catch((err)=>{err});
  }

  async EmailAndPassword(url:string){
    return await this.httpClient.get(url).toPromise().catch((err)=>{err});
  }
  async login(url:string){
    return await this.httpClient.get(url).toPromise().catch((err)=> err);
  }
  async LogOut(url:string){
    return await this.httpClient.get(url).toPromise().catch((err)=>{err});
  }

  async loginGoogle(){
    /*
    try{
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error){
      console.log(error);
    }
    */
  }
}

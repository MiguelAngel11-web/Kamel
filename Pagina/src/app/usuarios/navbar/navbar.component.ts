import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogin = false;
  public user: any;
  Google:boolean=false;
  Facebook:boolean=false;
  Normal:boolean=false;

  constructor(private router: Router, private api: ApiService, private activatedRoute: ActivatedRoute,    public auth: AngularFireAuth ) { }

  ngOnInit(): void {
    if(this.api.userGoogle){
      this.user = this.api.userGoogle;
      this.Google=true;
      this.Facebook=false;
      this.Normal=false;
    }
    else if(this.api.userFacebook){
      this.user = this.api.userFacebook;
      this.Facebook=true;
      this.Google=false;
      this.Normal=false;
    }else{
      this.user = this.api.user;
      this.Google=false;
      this.Facebook=false;
      this.Normal=true;
    }

    if(this.user){
      this.isLogin = true;
    }
  }

  async Salir(){
    if(this.Google==true || this.Facebook==true){
      this.api.userFacebook = null;
      this.api.userGoogle= null;
      this.auth.signOut().then(function() {
    // Sign-out successful.
        console.log("Data");
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
      }
      this.isLogin = false;
      this.user = null;
      this.Google=false;
      this.Facebook=false;
      this.Normal=false;
    await this.api.LogOut(`https://kinder-mountie-14642.herokuapp.com/salir`)
    .then((res:any)=>{
      if(res){
      this.api.user = null;
      }
    })



  }

  buscarJuego( nombrej:string ){
    this.router.navigate(['/buscador', nombrej ]);
  }

}

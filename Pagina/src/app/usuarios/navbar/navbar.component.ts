import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogin = false;
  public user:any;

  constructor(private router: Router, private api: ApiService ) { }

  ngOnInit(): void {
    this.user = this.api.user;
    if(this.user){
      this.isLogin = true;
    }
    console.log(this.user);
  }

  Salir(){

    this.api.LogOut(`https://kinder-mountie-14642.herokuapp.com/salir`)
    .then((resp)=>{console.log("LogOut-->",resp);
      if(resp!=null)
      this.isLogin=false})
    .catch((err)=>{console.log(err)});
  }

  buscarJuego( nombrej:string ){
    this.router.navigate(['/buscador', nombrej ]);
  }

}

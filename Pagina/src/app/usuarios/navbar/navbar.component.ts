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
    console.log("NavBar");
    this.api.getUser(`https://kinder-mountie-14642.herokuapp.com/getUser`)
    .then((data)=>{
      if(data){
        this.user=data;
        this.isLogin = true;
        console.log("User-->",this.user);
      }
    });

  }

  Salir(){
    this.isLogin=false
    this.api.LogOut(`https://kinder-mountie-14642.herokuapp.com/salir`)
    .then((resp)=>{console.log(resp)})
    .catch((err)=>{console.log(err)});
  }

  buscarJuego( nombrej:string ){
    this.router.navigate(['/buscador', nombrej ]);
  }

}

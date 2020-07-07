import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogin = false;
  public user:any;

  constructor(private router: Router, private api: ApiService,private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.user = this.api.user;
    if(this.user){
      this.isLogin = true;
    }
  }

  async Salir(){
    await this.api.LogOut(`https://kinder-mountie-14642.herokuapp.com/salir`)
    .then((res:any)=>{
      if(res){
      this.isLogin = false;
      this.user = null;
      this.api.user = null;
      }
    })

  }

  buscarJuego( nombrej:string ){
    this.router.navigate(['/buscador', nombrej ]);
  }

}

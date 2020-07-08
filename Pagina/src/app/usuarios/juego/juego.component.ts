import { Component, OnInit, Input } from '@angular/core';
import { JuegoService, Juego } from './../shared/juego.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  @Input() juego: Juego;
  xbox: boolean = false;
  nin: boolean = false;
  play: boolean = false;
  id:any;
  Google:boolean=false;
  Facebook:boolean=false;
  Normal:boolean=false;

  public isLogin = false;
  public user: any;

  constructor( public juegoService: JuegoService, public activatedRoute: ActivatedRoute, private router: Router, private api: ApiService ) {

    this.activatedRoute.params.subscribe( params => {
                                                      this.juego = juegoService.getJuego( params['id'] );
                                                      this.id = params['id'];
                                                      console.log(this.id);
                                                      if(this.juego.consola == 'PlayStation 4'){
                                                          this.play=true;
                                                          this.xbox=false;
                                                          this.nin=false;
                                                      }
                                                      if(this.juego.consola == 'Xbox One'){
                                                          this.play=false;
                                                          this.xbox=true;
                                                          this.nin=false;
                                                      }
                                                      if(this.juego.consola == 'Nintendo Switch'){
                                                        this.play=false;
                                                        this.xbox=false;
                                                        this.nin=true;
                                                      }

    });
  }

  ngOnInit(): void {
    if(this.api.userGoogle){
      this.user = this.api.userGoogle;
      this.Google=true;
      this.Facebook=false;
      this.Normal=false;
    }
    else if(this.api.userFacebook){
      this.user=this.api.userFacebook
      this.Facebook=true;
      this.Google=false;
      this.Normal=false;
    }
    else{
      this.user = this.api.user;
      this.Google=false;
      this.Facebook=false;
      this.Normal=true;
    }

    if(this.user){
      this.isLogin = true;
    }
    console.log(this.user);
  }

}

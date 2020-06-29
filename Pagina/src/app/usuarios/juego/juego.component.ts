import { Component, OnInit, Input } from '@angular/core';
import { JuegoService, Juego } from './../shared/juego.service';
import { ActivatedRoute } from '@angular/router';

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



  constructor( public juegoService: JuegoService, public activatedRoute: ActivatedRoute ) {

    this.activatedRoute.params.subscribe( params => {
                                                      this.juego = juegoService.getJuego( params['id'] );
                                                      if(this.juego.consola == 'PlayStation 4'){
                                                          this.play=true;
                                                          this.xbox=false;
                                                          this.nin=false;
                                                      }
                                                      if(this.juego.consola == 'Xbox 360'){
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
  }

}

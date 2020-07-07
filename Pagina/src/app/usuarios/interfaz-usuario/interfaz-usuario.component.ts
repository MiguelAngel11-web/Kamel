import { Component, OnInit,Input } from '@angular/core';


import { ActivatedRoute } from '@angular/router';

import { JuegoService, Juego } from './../shared/juego.service';

import { ApiService } from '../../service/api.service'

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-interfaz-usuario',
  templateUrl: './interfaz-usuario.component.html',
  styleUrls: ['./interfaz-usuario.component.css']
})
export class InterfazUsuarioComponent implements OnInit {

  @Input() juego:Juego;
  favoritos:[]=[]
  itemList: AngularFireList<any>;
  items: Observable<any>;


  constructor(private juegoService : JuegoService,public activatedRoute: ActivatedRoute,public api : ApiService ,public db: AngularFireDatabase){
    this.activatedRoute.params.subscribe(params=>{
      this.juego = this.juegoService.getJuego(params['id']);

      let body = {
        nombre:this.juego.nombre,
        id:this.api.id
      }

      this.items = db.list("usuario/"+body.id+"/favoritos").valueChanges();
      this.api.AgregarFavoritos(`http://localhost:5000/fav`,body);

      this.items.subscribe((data)=>{
        this.favoritos=data;
        console.log(this.favoritos)
        })

    })
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { JuegoService, Juego } from './../shared/juego.service';

import { ApiService } from '../../service/api.service'

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})



export class CarritoComponent implements OnInit {

  @Input() juego:Juego;
  itemList: AngularFireList<any>;
  items: Observable<any>;


  constructor(private juegoService : JuegoService,
    public activatedRoute: ActivatedRoute,
    public api : ApiService ,public db: AngularFireDatabase){
    this.activatedRoute.params.subscribe(params=>{
      this.juego = this.juegoService.getJuego(params['id']);

      let body = {
        nombre:this.juego.nombre,
        precio:this.juego.precio,
        id:this.api.id
      }

      this.api.AgregarProducto(`https://kinder-mountie-14642.herokuapp.com/producto`,body);
      this.itemList = db.list("usuario/"+body.id+"/carrito");
      this.items = db.list("usuario/"+body.id+"/carrito").valueChanges();
      this.items = this.itemList.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    })
  }

  BorrarProducto(key:string){
    this.itemList.remove(key);
  }

  ngOnInit() {}

}

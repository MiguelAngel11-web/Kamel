import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { JuegoService, Juego } from './../shared/juego.service';

import { ApiService } from '../../service/api.service'

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})



export class CarritoComponent implements OnInit {

  @Input() juego:Juego;
  productos:[]=[];
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

      this.items = db.list("usuario/"+body.id+"/carrito").valueChanges();
      this.api.AgregarProducto(`https://kinder-mountie-14642.herokuapp.com/producto`,body);

      this.items.subscribe((data)=>{
        this.productos=data;
        console.log(this.productos)
        })

    })
  }

  ngOnInit() {}
}

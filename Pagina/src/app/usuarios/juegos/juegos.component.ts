import { Component, OnInit } from '@angular/core';
import { JuegoService, Juego } from './../shared/juego.service';
import { Router } from '@angular/router';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  misjuegos: Juego[] = [];

  itemList: AngularFireList<any>;
  items: Observable<any>;

  constructor(public juegoServise: JuegoService, public router: Router,private db: AngularFireDatabase) {
    this.itemList = db.list('games');
    this.items = db.list('games').valueChanges();
  }


  ngOnInit(): void {
    this.items.subscribe( ( res:Juego[] ) => {
      this.misjuegos=res
      this.juegoServise.getJuegos(this.misjuegos)
    })
  }

}

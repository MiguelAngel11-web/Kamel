import { Component, OnInit,Input } from '@angular/core';

import { JuegoService, Juego } from './../shared/juego.service';


@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.component.html',
  styleUrls: ['./codigo-qr.component.css']
})
export class CodigoQRComponent implements OnInit {


  elementType :'url' | 'canvas' | 'img' = 'url'; //Podemos colocar img, canvas o un url
  value: string;
  display = false;

  @Input() precio: string;
  constructor(public juegoServise: JuegoService) {}

  generateQRCode(){
    console.log(this.precio);
    this.value = this.precio;
    this.display = true;
  }

  ngOnInit(): void {
  }

}

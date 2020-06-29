import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.component.html',
  styleUrls: ['./codigo-qr.component.css']
})
export class CodigoQRComponent implements OnInit {

  constructor() { }

  elementType :'url' | 'canvas' | 'img' = 'url'; //Podemos colocar img, canvas o un url
  value: string;
  display = false;
  array: string[];

  generateQRCode(){
    this.array = ["|JutDance:$140|","|Just Cause: $400|","|Fornite: Free|","|CoD:Free|","|Resident Evil 5: 230|","|Minecraft: $400|"];
    var index = Math.floor(Math.random() * (5 - 0) + 0);
    console.log(index);
    this.value = this.array[index];
    this.display = true;
  }

  ngOnInit(): void {
  }

}

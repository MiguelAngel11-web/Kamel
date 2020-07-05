import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  mode = new FormControl('over');

  itemList: AngularFireList<any>;
  items: Observable<any>;
  ban:boolean=false;

  form;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 3 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 3 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,private db: AngularFireDatabase, private fb: FormBuilder) {
    this.form = fb.group({
      nombre: ['', Validators.required],
     descripcion: ['', Validators.required],
     consola: ['', Validators.required],
     img: ['', Validators.required],
     precio: ['', [
       Validators.required,
       Validators.maxLength(6),
       Validators.minLength(3),
       Validators.pattern(/^\d+$/)
      ]]
    });

    this.itemList = db.list('games');
  }

  submit() {
    if (this.form.valid) {
     alert("Se a agredo tu producto")
    }
    else{
      alert("FILL ALL FIELDS")
    }
  }


  AltasProductos(nombre:any,descrip:string,consola:string,precio:string,img:number){
    this.itemList.push({
      consola:consola,
      descrip:descrip,
      img:img,
      nombre:nombre.value,
      precio:"$" + precio
    });
    nombre.focus();
    this.form.reset();

  }
  ngOnInit():void{
  }

}

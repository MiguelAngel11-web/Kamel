import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
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

  form:FormGroup;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Altas a productos', cols: 1, rows: 2 },
          { title: 'Bajas a porductos', cols: 2, rows: 5 },
        ];
      }

      return [
        { title: 'Altas a productos', cols: 2, rows: 2 },
        { title: 'Bajas a porductos', cols: 2, rows: 5 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,private db: AngularFireDatabase, private fb: FormBuilder) {
    const url = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;
    this.form = fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
     consola: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(15)]],
     img: ['', [Validators.required,Validators.pattern(url)]],
     precio: ['', [
       Validators.required,
       Validators.maxLength(4),
       Validators.minLength(3),
       Validators.pattern(/^\d+$/)
      ]]
    });

    this.itemList = db.list('games');
    this.items = db.list('games').valueChanges();
    this.items = this.itemList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  submit() {
    if (this.form.valid) {
      this.ban=true;
       this.AltasProductos();
       this.form.reset();
       this.form.clearValidators();
    }
    else{
      this.form.markAllAsTouched();
    }
  }

  BorrarProducto(key:string){
    this.itemList.remove(key);
  }


  AltasProductos(){
    const {nombre,descripcion,consola,precio,img} =  this.form.value;
    this.itemList.push({
      consola:consola,
      descrip:descripcion,
      img:img,
      nombre:nombre,
      precio:"$" + precio
    });


  }
  ngOnInit():void{
  }

}

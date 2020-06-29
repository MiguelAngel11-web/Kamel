import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /*-------------Declaracion de variables---------------*/
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  hide = true;

  itemList: AngularFireList<any>;
  items: Observable<any>;
  /*----------------------------*/

  //Inicia contructor
  constructor(
    private _formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    public angularAuth: AngularFireAuth
  ) {
    this.itemList = db.list('usuario');
    this.items = db.list('usuario').valueChanges();
    this.items = this.itemList
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  //Acaba contrsuctor

  /*----------------------------*/
  entrar(user: string, pass: string) {
    this.items.forEach((element) => {
      for (var i = 0; i < element.length; i++) {
        if (element[i].usuario == user && element[i].password == pass) {
          console.log('Te has logueado');
          alert('Bienvenido ' + element[i].usuario);
        }
      }
    });
  }

  /*----------------------------*/
  EntrarconFacebook() {
    this.angularAuth
      .signInWithPopup(new auth.FacebookAuthProvider())
      .then((result) => {
        console.log(result.user);
        alert(
          'Iniciaste Sesion con tu cuenta de Facebook, Bienvenido ' +
            result.user.displayName
        );
      });
  }
  /*----------------------------*/

  /*----------------------------*/
  EntrarconGoogle() {
    this.angularAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {
        console.log(result.user);
        alert(
          'Iniciaste Sesion con tu cuenta de Google, Bienvenido ' +
            result.user.displayName
        );
      });
    this.angularAuth.useDeviceLanguage();
  }
  /*----------------------------*/

  /*----------------------------*/
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  /*----------------------------*/


}/*-----termina class*/

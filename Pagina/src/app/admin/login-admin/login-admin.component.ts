import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  hide = true;


  itemList: AngularFireList<any>;
  items: Observable<any>;


  constructor(private _formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    public angularAuth: AngularFireAuth,
    private router: Router) {
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
        if ((element[i].email == user && element[i].pass == pass) && user == "mike@gmail.com") {
          console.log('Te has logueado');
          this.router.navigate(['/dash']);
        }
      }
    });
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


}

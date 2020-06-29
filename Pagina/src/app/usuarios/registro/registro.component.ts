import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CustomValidators } from './validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  forma: FormGroup;
  fb: FormControl;
  itemList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.itemList = db.list('usuario');

    this.forma = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });

    this.forma
      .get('confirmPassword')
      .setValidators(CustomValidators.equals(this.forma.get('password')));
  }

  onSubmit(): void {
    const password = this.forma.get('password').value as string;
    // Tú lógica de negocio...
    console.log(password);
  }

  ngOnInit(): void {}

  RegistroNuevo(usuario: string, email: string, password: string) {
    console.log(usuario);
    this.itemList.push({
      email: email,
      usuario: usuario,
      password: password,
    });
  }
}

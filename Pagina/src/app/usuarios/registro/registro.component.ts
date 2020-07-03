import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { CustomValidators } from './validator';

import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  forma: FormGroup;
  fb: FormControl;

  constructor(private api:ApiService) {


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
    console.log('Form--> ',this.forma.value);
  }

  ngOnInit(): void {}

  RegistroNuevo() {
    const {username,email,password} = this.forma.value;
    let body = {
      user: username,
      email: email,
      pass: password
    };
    this.api.EmailAndPassword(`https://kinder-mountie-14642.herokuapp.com/crear/${email}/${password}`)

    this.api.alta(`https://kinder-mountie-14642.herokuapp.com/registro`,body)
    .then((data)=>{console.log(data)})
    .catch((err)=>{console.log(err)})
  }
}

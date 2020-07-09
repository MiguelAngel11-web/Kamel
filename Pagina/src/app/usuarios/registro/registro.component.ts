import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import { Validator } from './validator';

import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  forma: FormGroup;
  fb: FormControl;
  conectado = false;
  constructor(private api:ApiService,public builder :FormBuilder, public router: Router) {

    this.forma = this.builder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
      ]],
      email: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.email,
      ],Validator.validateEmail(this.api)],
      password:['', [Validators.required,Validators.minLength(5)]],
      confirmPassword: ['' ,Validators.compose([Validators.required])],
    },{
      // check whether our password and confirm password match
      validator: Validator.passwordMatchValidator
   });

  }



  onSubmit(): void {

    if(this.forma.valid){

      this.RegistroNuevo();
      this.conectado = true;
      console.log(this.forma.value);
      this.forma.reset();
    }else{
      this.forma.markAllAsTouched();
      console.log("No valido")
    }
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
    .then((data)=>{console.log(data); this.api.id=data})
    .catch((err)=>{console.log(err)})
  }

  get username(){return this.forma.get("username")}
  get email(){return this.forma.get("email")}
  get password(){return this.forma.get("password")}
  get confirmPassword(){return this.forma.get("confirmPassword")}

  get EmailIsValid(){
    return this.email.touched && this.email.valid;
  }

  get EmailIsInvalid(){
    return this.email.touched && this.email.invalid;
  }
  get UserIsValid(){
    return this.username.touched && this.username.valid;
  }

  get UserIsInvalid(){
    return this.username.touched && this.username.invalid;
  }

  get PassIsValid(){
    return this.password.touched && this.password.valid;
  }

  get PassIsInvalid(){
    return this.password.touched && this.password.invalid;
  }

  get ConfirmPassIsValid(){

    return this.confirmPassword.touched && this.confirmPassword.valid;
  }

  get ConfirmPassIsInvalid(){

    return this.confirmPassword.touched && this.confirmPassword.invalid;
  }
}

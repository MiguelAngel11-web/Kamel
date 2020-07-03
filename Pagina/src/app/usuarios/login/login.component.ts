import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { auth } from 'firebase/app';

import { ApiService } from '../../service/api.service';


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

  /*----------------------------*/

  //Inicia contructor
  constructor(private _formBuilder: FormBuilder, public api:ApiService) {}
  //Acaba contrsuctor

  /*----------------------------*/
   entrar(user: string, pass: string) {
    this.api.iniciarSesion(`https://kinder-mountie-14642.herokuapp.com/user/${user}`)
    .then((data)=>{console.log(data)})
    .catch((err)=>{console.log(err)})

    this.api.login(`https://kinder-mountie-14642.herokuapp.com/signin/${user}/${pass}`).catch((err)=>{console.log(err)});

  }

  /*----------------------------*/
  EntrarconFacebook() {
  }
  /*----------------------------*/

  /*----------------------------*/
  EntrarconGoogle() {
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

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
    this.api.iniciarSesion(`https://kinder-mountie-14642.herokuapp.com/user/${user}`).subscribe((data:any)=>{
    console.log(data.email);
    //Ver si el usuario esta en la base
    if((data.user == user || data.email == user) && data.pass == pass){
      alert("Inicia sesion");
    }else{
      alert("No esta registrado");
    }


  });
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

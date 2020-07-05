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
   entrar(email: string, pass: string) {
    /*this.api.iniciarSesion(`https://kinder-mountie-14642.herokuapp.com/email/${email}`)
    .then((data)=>{console.log("Login-->",data)})
    .catch((err)=>{console.log(err)})*/

    this.api.login(`https://kinder-mountie-14642.herokuapp.com/signin/${email}/${pass}`).then((data:any)=>{

      console.log("NavBar");
      this.api.getUser(`https://kinder-mountie-14642.herokuapp.com/getUser/${email}`).then((data:any)=>{
        if(data){
          console.log(data);
          this.api.user=data;
        }
      });
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

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

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
  constructor(private _formBuilder: FormBuilder, public api:ApiService,private router: Router) {}
  //Acaba contrsuctor

  /*----------------------------*/
   entrar(email: string, pass: string) {
    /*this.api.iniciarSesion(`https://kinder-mountie-14642.herokuapp.com/email/${email}`)
    .then((data)=>{console.log("Login-->",data)})
    .catch((err)=>{console.log(err)})

    `https://kinder-mountie-14642.herokuapp.com/user/${email}`*/

    this.api.login(`https://kinder-mountie-14642.herokuapp.com/signin/${email}/${pass}`)
    .then((data:any)=>{
      console.log(data)
      console.log("NavBar");
    this.api.getUser(`https://kinder-mountie-14642.herokuapp.com/getUser/${email}`).then((data:any)=>{
      if(data){
        console.log(data);
        this.api.user=data;
        this.router.navigate(['/interfazUser']);
      }
    });
    });

    this.api.GetIDUser(`https://kinder-mountie-14642.herokuapp.com/getID/${email}`)
    .then((data)=>{console.log(data); this.api.id = data})

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

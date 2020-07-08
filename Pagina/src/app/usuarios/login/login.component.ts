import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { ApiService } from '../../service/api.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /*-------------Declaracion de variables---------------*/
  isLinear = false;
  forma: FormGroup;
  hide = true;

  /*----------------------------*/

  //Inicia contructor
  constructor(
    private builder: FormBuilder,
    public api: ApiService,
    private router: Router,
    public auth: AngularFireAuth
  ) {
    this.forma = this.builder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ] /* , Validator.validateEmail(this.api) */,
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.forma.valid) {
      console.log(this.forma.value);
      this.entrar();
    } else {
      this.forma.markAllAsTouched();
    }
  }
  //Acaba contrsuctor

  /*----------------------------*/
  entrar() {
    const { email, password } = this.forma.value;
    this.api
      .login(
        `https://kinder-mountie-14642.herokuapp.com/signin/${email}/${password}`
      )
      .then((data: any) => {
        this.api
          .getUser(
            `https://kinder-mountie-14642.herokuapp.com/getUser/${email}`
          )
          .then((data: any) => {
            if (data) {
              this.api.user = data;
              this.router.navigate(['/interfazUser']);
            }
          });
      });

    this.api
      .GetIDUser(`https://kinder-mountie-14642.herokuapp.com/getID/${email}`)
      .then((data) => (this.api.id = data));
  }

  get password() {
    return this.forma.get('password');
  }
  get email() {
    return this.forma.get('email');
  }
  get PassIsValid() {
    return this.password.touched && this.password.valid;
  }

  get PassIsInvalid() {
    return this.password.touched && this.password.invalid;
  }

  get EmailIsValid() {
    return this.email.touched && this.email.valid;
  }

  get EmailIsInvalid() {
    return this.email.touched && this.email.invalid;
  }

  /*----------------------------*/
  EntrarconFacebook() {
    this.auth
    .signInWithPopup(new auth.FacebookAuthProvider())
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // The signed-in user info.
      var user = result.user;
      this.api.userFacebook = user;
      this.api.GetUsuariosExternos(user.email).toPromise()
      .then((data)=>{
        if(Object.keys(data).length === 0){
          let body = {
            user: user.displayName,
            email: user.email,
          };
          this.api.GoogleFacebook(`https://kinder-mountie-14642.herokuapp.com/userexternos`,body)
          .then((data)=>{console.log(data); this.api.id=data})
          .catch((err)=>{console.log(err)})

         /*   */
        }
        else{
          this.api
          .GetIDUser(`https://kinder-mountie-14642.herokuapp.com/getID/${user.email}`)
          .then((data) => (this.api.id = data));
          console.log("En else---->",user);

        }
      })
      this.router.navigate(['/interfazUser']);
      // ...
    })

  }
  /*----------------------------*/

  /*----------------------------*/
  EntrarconGoogle() {
    this.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        var user = result.user;
        this.api.userGoogle = user;
        this.api.GetUsuariosExternos(user.email).toPromise()
        .then((data)=>{
          if(Object.keys(data).length === 0){
            let body = {
              user: user.displayName,
              email: user.email,
            };
            this.api.GoogleFacebook(`https://kinder-mountie-14642.herokuapp.com/userexternos`,body)
            .then((data)=>{console.log(data); this.api.id=data})
            .catch((err)=>{console.log(err)})
          }else{
            this.api
            .GetIDUser(`https://kinder-mountie-14642.herokuapp.com/getID/${user.email}`)
            .then((data) => (this.api.id = data));
          }
        })
        this.router.navigate(['/interfazUser']);
        console.log(user);
        // ...
      })
  }
  /*----------------------------*/

  /*----------------------------*/
  ngOnInit() {}
  /*----------------------------*/
} /*-----termina class*/

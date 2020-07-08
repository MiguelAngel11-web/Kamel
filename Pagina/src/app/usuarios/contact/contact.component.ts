import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { ApiService } from './../../service/api.service';
/**
 * @title Stepper with optional steps
 */


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  forma: FormGroup;

  constructor(private apisService: ApiService, public fb : FormBuilder) {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      msj: ['',[Validators.required,Validators.maxLength(50)]],
      email: ['',[Validators.required,Validators.email]],
      phone:['',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.maxLength(13),
        Validators.minLength(10)]]
 });
  }

  onSubmit(){
    if(this.forma.valid){
      this.MandarCorreo();
    }else{
      this.forma.markAllAsTouched();
    }
  }

  MandarCorreo(){
    const {nombre,email,phone,msj} = this.forma.value;
    let body = {
      name: nombre,
      email: email,
      phone: phone,
      message: msj
    }
    this.apisService.EnviarCorreo(`https://scenic-rocky-mountain-66606.herokuapp.com/sendmail`,body);
    this.forma.reset();
  }

  ngOnInit() {}

  get nombre(){return this.forma.get('nombre')}
  get email(){return this.forma.get('email')}
  get phone(){return this.forma.get('phone')}
  get msj(){return this.forma.get('msj')}

  get EmailIsValid(){return this.email.touched && this.email.valid;}

  get EmailIsInvalid(){return this.email.touched && this.email.invalid;}

  get NombreIsValid(){ return this.nombre.touched && this.nombre.valid;}

  get NombreIsInvalid(){return this.nombre.touched && this.nombre.invalid;}

  get PhoneIsValid(){return this.phone.touched && this.phone.valid;}

  get PhoneIsInvalid(){return this.phone.touched && this.phone.invalid;}

  get MsjIsValid(){return this.msj.touched && this.msj.valid;}

  get MsjIsInvalid(){return this.msj.touched && this.msj.invalid;}

}

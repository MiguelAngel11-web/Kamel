import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  forma: FormGroup;

  constructor(private apisService: ApiService) {
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'msj': new FormControl('',Validators.required),
      'email': new FormControl('',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'phone':new FormControl('',
      [ Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.maxLength(13),
        Validators.minLength(10)])
 });
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

  ngOnInit() {
    /*this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });*/
  }

}

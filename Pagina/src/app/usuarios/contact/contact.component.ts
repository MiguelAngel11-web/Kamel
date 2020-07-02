import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  constructor(private _formBuilder: FormBuilder,private apisService: ApiService) {}

  MandarCorreo(name: string, email: string, phone: string, msj: string){
    let body = {
      name: name,
      email: email,
      phone: phone,
      msj: msj
    }

    /*this.apisService.alta2('https://api-kamel.herokuapp.com/send-mail', body)
      .then((data) => { console.log(data) })
      .catch((err) => {
        console.log(err)
      })*/
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
  }

}

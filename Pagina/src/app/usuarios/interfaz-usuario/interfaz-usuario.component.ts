import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-interfaz-usuario',
  templateUrl: './interfaz-usuario.component.html',
  styleUrls: ['./interfaz-usuario.component.css']
})
export class InterfazUsuarioComponent implements OnInit {
  public user: any;
  public name: any;

  constructor(private router: Router, private api: ApiService,private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.user = this.api.user;

    console.log('USUARIO -->', this.user);
  }

}

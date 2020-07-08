import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegoService, Juego } from './../shared/juego.service';
import { ApiService } from '../../service/api.service'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-interfaz-usuario',
  templateUrl: './interfaz-usuario.component.html',
  styleUrls: ['./interfaz-usuario.component.css']
})
export class InterfazUsuarioComponent implements OnInit {
  public user: any;
  public name: any;

  @Input() juego:Juego;
  favoritos:[]=[]
  compras:[]=[];

  itemsCompras: Observable<any>;
  itemList: AngularFireList<any>;
  itemListaCompra: AngularFireList<any>;

  items: Observable<any>;
  Google:boolean=false;
  Facebook:boolean=false;
  Normal:boolean=false;


  constructor(private juegoService : JuegoService,public activatedRoute: ActivatedRoute,public api : ApiService ,public db: AngularFireDatabase){
    this.itemList = this.db.list("usuario/"+this.api.id+"/favoritos");
    this.user = this.api.user;
    this.items = this.db.list("usuario/"+this.api.id+"/favoritos").valueChanges();
    this.items = this.itemList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.itemListaCompra = this.db.list("usuario/"+this.api.id+"/compra");
      this.itemsCompras = this.db.list("usuario/"+this.api.id+"/compra").valueChanges();
      this.itemsCompras = this.itemListaCompra.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );


    this.activatedRoute.params.subscribe(params=>{
      this.juego = this.juegoService.getJuego(params['id']);

      let body = {
        nombre:this.juego.nombre,
        id:this.api.id
      }

      this.api.AgregarFavoritos(`https://kinder-mountie-14642.herokuapp.com/fav`,body);

    })
  }

  BorrarFav(key:string)
  {
    this.itemList.remove(key);
  }

  BorrarCompra(key:string){
    this.itemListaCompra.remove(key);
  }

  ngOnInit(): void {
    if(this.api.userGoogle){
      this.user = this.api.userGoogle;
      this.Google=true;
      this.Facebook=false;
      this.Normal=false;
    }
    else if(this.api.userFacebook){
      this.user=this.api.userFacebook
      this.Facebook=true;
      this.Google=false;
      this.Normal=false;
    }
    else{
      this.user = this.api.user;
      this.Google=false;
      this.Facebook=false;
      this.Normal=true;
    }
    console.log('USUARIO -->', this.user);
  }

}

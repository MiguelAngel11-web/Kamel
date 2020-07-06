
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './usuarios/navbar/navbar.component';
import { HomeComponent } from './usuarios/home/home.component';
import { JuegosComponent } from './usuarios/juegos/juegos.component';
import { AboutComponent } from './usuarios/about/about.component';
import { QuestionComponent } from './usuarios/question/question.component';
import { LoginComponent } from './usuarios/login/login.component';
import { RegistroComponent } from './usuarios/registro/registro.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { InterfazUsuarioComponent } from './usuarios/interfaz-usuario/interfaz-usuario.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './usuarios/material/material.module';
// --------------------------------- SERVICIOS ---------------------------------
import { JuegoService } from './usuarios/shared/juego.service';
import { JuegoComponent } from './usuarios/juego/juego.component';
import { BuscadorComponent } from './usuarios/buscador/buscador.component';
import { FooterComponent } from './usuarios/footer/footer.component';
import { ContactComponent } from './usuarios/contact/contact.component';
import { PanelComponent } from './admin/panel/panel.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
//Comando de voz
import {SpeechSynthesisModule} from '@kamiazya/ngx-speech-synthesis';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CodigoQRComponent } from './usuarios/codigo-qr/codigo-qr.component';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { GraficaComponent } from './admin/grafica/grafica.component';
import { HttpClientModule } from '@angular/common/http';
import { CarritoComponent } from './usuarios/carrito/carrito.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    JuegosComponent,
    AboutComponent,
    QuestionComponent,
    LoginComponent,
    JuegoComponent,
    BuscadorComponent,
    FooterComponent,
    ContactComponent,
    PanelComponent,
    DashboardComponent,
    RegistroComponent,
    CodigoQRComponent,
    LoginAdminComponent,
    GraficaComponent,
    InterfazUsuarioComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    SpeechSynthesisModule.forRoot({
      lang: 'es-MX',
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0,
    }),
    AngularFireModule.initializeApp(
        { apiKey: "AIzaSyACuw8o9wJT_yX1sMlAhqJbQYqwG5JBNnI",
        authDomain: "kamel-6e19d.firebaseapp.com",
        databaseURL: "https://kamel-6e19d.firebaseio.com",
        projectId: "kamel-6e19d",
        storageBucket: "kamel-6e19d.appspot.com",
        messagingSenderId: "687303594591",
        appId: "1:687303594591:web:bc30fd188a8cf29d66c1ea",
        measurementId: "G-F24KR2WGM1}"
      }
    ),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    NgxQRCodeModule,
    HttpClientModule,
  ],
  providers: [JuegoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

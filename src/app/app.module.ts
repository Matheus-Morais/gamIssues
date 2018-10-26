import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { MissoesComponent } from './missoes/missoes.component';
import { JogadorComponent } from './jogador/jogador.component';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { UsuarioCadastroComponent } from './usuario/usuario-cadastro/usuario-cadastro.component';

import { UsuarioService } from './usuario/usuario.service';
import { GitlabService } from './gitlab.service';

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

const appRoutes: Routes = [
  {path: 'dashboard', component: BodyComponent},
  {path: 'login', component: UsuarioLoginComponent},
  {path: 'cadastro', component: UsuarioCadastroComponent},
  {path: 'missoes', component: MissoesComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    MissoesComponent,
    JogadorComponent,
    HomeComponent,
    UsuarioComponent,
    UsuarioLoginComponent,
    UsuarioCadastroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    LoadingBarHttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  providers: [
    UsuarioService,
    GitlabService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Usuario } from './usuario.model';
import { Jogador } from './jogador.model';
import { TouchSequence } from 'selenium-webdriver';


@Injectable() //Usado sempre para algo que recebe dados de outras coisas, por exemplo, de uma api
export class UsuarioService {

  API_URL = 'http://localhost:8000';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public user = null;

  constructor(private http: HttpClient) {
  }

  login(username: string, senha: string): Observable<any>{
    const qs = {'username': username, 'password': senha};
    return this.http.post<any>(this.API_URL + '/login/', qs);
  }

  save(username: string, senha: string, privatetoken: string, first_name: string, last_name: string, email: string, image: string) {
    
    const jogador = {
      "user": {
        "username": username, 
        "password": senha,
        "first_name": first_name,
        "last_name": last_name, 
        "email": email
      },
      "private_token": privatetoken,
      "url_imagem": image
    }; 
    // Precisa criar um model para user e para Jogador, e passar esse model
    console.log(JSON.parse(JSON.stringify(jogador)));
    return this.http.post(this.API_URL + '/criarjogador/', JSON.parse(JSON.stringify(jogador)));
  }

  addMissao(missao){
    return this.http.post(this.API_URL + '/criarmissao/', missao, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  updateMissao(id, aux){
    let missao;
    if(aux){
      missao = {"status": true, "nice_tempo": aux};
    }
    else{
      missao = {"status": true, "nice_tempo": aux, "xp_missao": 40};

    }
    return this.http.patch(this.API_URL + '/missao/' + id + '/', missao, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  updateUsuarioXP_MF(xp, mf, id){
    const xpJ = {"xp_total": xp, "m_realizadas": mf};
    //console.log(JSON.parse(localStorage.getItem('Usuario Logado')).token);
    return this.http.patch(this.API_URL + '/jogador/' +id+ '/', xpJ, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }
  atualizarJogador(id, dados){
    return this.http.patch(this.API_URL + '/jogador/' +id+ '/', dados, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }
  updateUsuario_MA(id, ma){
    const xpJ = {"m_adquiridas": ma};
    //console.log(id);
    return this.http.patch(this.API_URL + '/jogador/' +id+ '/', xpJ, {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  getUsuarios(): Observable<Jogador[]>{
    return this.http.get<Jogador[]>(this.API_URL + '/jogador/', {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  getUser(token): Observable<any>{
    //console.log(token, 'getuser')
    return this.http.get<any>(this.API_URL + '/user/', {
      headers: new HttpHeaders().set('authorization', 'Token ' + token)
    });
  }

  getJogador(id, token): Observable<any>{
    //console.log(id, token);
    return this.http.get<any>(this.API_URL + '/jogador/' + id + '/', {
      headers: new HttpHeaders().set('authorization', 'Token ' + token)
    });
  }

  getMissoes(): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + '/missao'+ '/', {
      headers: new HttpHeaders().set('authorization', 'Token ' + JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  set(user, tokenn, tokengitlab) {
    let userL = 'Usuario Logado';
    console.log(user);
    let myObj = {id: user.id, username: user.username, token: tokenn, gitlab_token: tokengitlab};
    localStorage.setItem(userL, JSON.stringify(myObj));

  }

  get() {
    return this.user;
  }

  clear() {
    let userL = 'Usuario Logado';
    localStorage.removeItem(userL);
  }

  logout() {
    this.clear();
  }

}

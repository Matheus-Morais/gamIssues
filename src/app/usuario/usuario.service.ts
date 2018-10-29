import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Usuario } from './usuario.model'
import { TouchSequence } from 'selenium-webdriver';


@Injectable() //Usado sempre para algo que recebe dados de outras coisas, por exemplo, de uma api
export class UsuarioService {

  API_URL = 'http://localhost:3000';
  public user = null;

  constructor(private http: HttpClient) {
  }

  login(username: string, senha: string): Observable<any[]>{
    const qs = 'username=' + username + '&senha=' + senha;
    return this.http.get<Usuario[]>(this.API_URL + '/usuarios?' + qs);
  }

  save(username: string, senha: string) {
    const user = {'username': username, 'senha': senha};
    return this.http.post(this.API_URL + '/usuarios', user);
  }

  addMissao(missao){
    return this.http.post(this.API_URL + '/missoes', missao);
  }

  updateMissao(id){
    const missao = {status: true};
    return this.http.patch(this.API_URL + '/missoes/' + id, missao);
  }

  updateUsuario(xp){
    const xpJ = {"xp": xp};
    console.log(xpJ);
    return this.http.patch(this.API_URL + '/usuarios/1', xpJ);
  }

  getUsuarios(): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + '/usuarios');
  }
  getUser(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/usuarios/'+ JSON.parse(localStorage.getItem('Usuario Logado')).id);
  }

  getMissoes(): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + '/missoes');
  }

  set(user) {
    let userL = 'Usuario Logado';
    let myObj = {id: user.id, username: user.username, senha: user.senha, gitlab_username: user.gitlab_username, token: user.token, xp:user.xp};
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

import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Usuario } from './usuario.model'


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

  set(user) {
    let userL = 'Usuario Logado';
    let myObj = {username: user.username, senha: user.senha};
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

  getUsuarios(): Observable<any[]> { //Sempre que retorna algo da api, retorna um Observable, por isso é necessario essa nomenclatura
    return this.http.get<Usuario[]>(this.API_URL + '/usuarios')
  }

}

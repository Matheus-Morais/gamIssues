import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private API_URL = 'http://localhost:8000';
  public isAutenticado = new EventEmitter<boolean>();
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public http: HttpClient, private rotas: Router) {

    if (localStorage.getItem('token'))
      this.isUserLoggedIn.next(true);
    else
      this.isUserLoggedIn.next(false);

  }

  public setToken(token: string): void {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Token ' + token })
  }

  public sair() {
    localStorage.removeItem('token');
    return true;
  }

  public login(formulario: FormData) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.API_URL}/login/`, formulario)
        .subscribe((resposta: any) => {
          resolve(resposta.json())
          this.isUserLoggedIn.next(true);
        },
          (error) => {
            reject(error.json())
            this.isUserLoggedIn.next(false);
          }
        )
    });
  }

  public getUserInfo(): Observable<any> {
    return this.http.get(`${this.API_URL}/jogador/`, {
      headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('token'))
    });
  }

  public entrar(formulario: JSON): |Observable<any> {
    return this.http.post(`${this.API_URL}/login/`, formulario);

  }

}

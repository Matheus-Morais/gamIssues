import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitlabService {

  API_URL = 'https://gitlab.com/api/v4/';
  // token_gitlab = JSON.parse(localStorage.getItem('Usuario Logado')).token;  
  //headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient) { 
    // this.setToken();
  }

  // setToken(){
  //   this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'PRIVATE-TOKEN': this.token_gitlab })
  // }

  public getGroupBystro(): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + 'groups/'+'NOME DO GRUPO'+'?private_token='+JSON.parse(localStorage.getItem('Usuario Logado')).token);
    // , {
    //   headers: new HttpHeaders().set('Authorization','PRIVATE-TOKEN'+ localStorage.getItem('token'))
    // }
    
  }
}

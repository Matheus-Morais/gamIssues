import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserGitLab} from './usergitlab.model';

@Injectable({
  providedIn: 'root'
})
export class GitlabService {

  API_URL = 'https://gitlab.com/api/v4/';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
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
    // private_token='+JSON.parse(localStorage.getItem('Usuario Logado')).token
    // }
    
  }

  public getIDforGitlabUser(): Observable<any>{
    // let user = this.http.get<UserGitLab>(this.API_URL + 'users?username='+ JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_username, {
    //   headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).token)
    // });
    // console.log(user.id);
    return this.http.get<any>(this.API_URL + 'users?username='+ JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_username, {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });;
  }

  public getIssuesUser(id: string): Observable<any>{
    return this.http.get(this.API_URL + 'groups/issues-gamificacao/issues?assignee_id='+ id, {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }

  public getProject(id): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + 'projects/'+id+'/', {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).token)
    });
  }
}

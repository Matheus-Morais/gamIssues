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

  getProjetos(token): Observable<any[]>{
    console.log(JSON.parse(localStorage.getItem('Usuario Logado')));
    return this.http.get<any>(this.API_URL + 'groups/issues-gamificacao/projects?private_token='+token);
  }

  public getGroups(): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + 'groups/'+'NOME DO GRUPO'+'?private_token='+JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token);
    // , {
    //   headers: new HttpHeaders().set('Authorization','PRIVATE-TOKEN'+ localStorage.getItem('token'))
    // private_token='+JSON.parse(localStorage.getItem('Usuario Logado')).token
    // }
    
  }

  public getIDforGitlabUser(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'users?username='+ JSON.parse(localStorage.getItem('Usuario Logado')).username, {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token)
    });;
  }

  public getGitlabUser(username, token): Observable<any>{
    console.log(username, token);
    return this.http.get<any>(this.API_URL + 'users?username='+ username, {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', token)
    });
  }

  public getIssueState(state): Observable<any>{
    return this.http.get(this.API_URL + 'groups/issues-gamificacao/issues?state='+ state, {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token)
    });
  }

  public getIssuesUser(id: string): Observable<any>{
    return this.http.get(this.API_URL + 'groups/issues-gamificacao/issues?assignee_id='+ id, {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token)
    });
  }

  public getProject(id): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + 'projects/'+id+'/', {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token)
    });
  }
}

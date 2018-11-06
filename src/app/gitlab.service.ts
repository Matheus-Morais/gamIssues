import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserGitLab} from './usergitlab.model';

@Injectable({
  providedIn: 'root'
})
export class GitlabService {

  // API_URL = 'https://gitlab.com/api/v4/';
  API_URL = 'http://gitlab.bitstudio.io/api/v4/';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  

  constructor(private http: HttpClient) { 
  }

  getProjetos(token): Observable<any[]>{
    return this.http.get<any>(this.API_URL + 'groups/fsw/projects?per_page=100&private_token='+token);
  }

  public getGroups(): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + 'groups/'+'NOME DO GRUPO'+'?private_token='+JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token);
    
  }

  public getIDforGitlabUser(): Observable<any>{
    return this.http.get<any>(this.API_URL + 'users?username='+ JSON.parse(localStorage.getItem('Usuario Logado')).username, {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token)
    });;
  }

  public getGitlabUser(username, token): Observable<any>{
    return this.http.get<any>(this.API_URL + 'users?username='+ username, {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', token)
    });
  }

  public getIssueState(state, page: string): Observable<any>{
    return this.http.get(this.API_URL + 'groups/fsw/issues?state='+ state + '&page=' + page + '&per_page=100', {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token)
    });
  }

  public getIssuesUser(id: string, page: string): Observable<any>{
    return this.http.get(this.API_URL + 'groups/fsw/issues?assignee_id='+ 4 + '&page=' + page + '&per_page=100', {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token)
    });
  }

  public getIssuesProject(id: string): Observable<any>{
    return this.http.get(this.API_URL + 'projects/'+id+'/issues', {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token)
    });
  }

  public getProject(id): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL + 'projects/'+id+'/', {
      headers: new HttpHeaders().set('PRIVATE-TOKEN', JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token)
    });
  }
}

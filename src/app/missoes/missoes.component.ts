import { Component, OnInit } from '@angular/core';
import { GitlabService } from '../gitlab.service';
import {UserGitLab} from '../usergitlab.model';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'gam-missoes',
  templateUrl: './missoes.component.html',
  styleUrls: ['./missoes.component.css']
})
export class MissoesComponent implements OnInit {

  user: any = null;
  projetos: any = null;
  issues: any = null;
  gitlab_username = null;
  constructor(private gitlabService: GitlabService) { }

  ngOnInit() {
    this.gitlabService.getIDforGitlabUser().subscribe(User => {
      this.getIssues(User[0].id
        )});
    this.gitlab_username = JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_username;
  }


  getIssues(id){
    this.gitlabService.getIssuesUser(id).subscribe(Issues => this.issues = Issues)
  }

  getProjetos(){
    this.gitlabService.getGroupBystro().subscribe(groupBystro => this.projetos = groupBystro)
  }

  ArrumarData(date){
    var data = date.split('-', 3)
    return data[2]+ '/'+ data[1]+ '/' + data[0];
  }

}

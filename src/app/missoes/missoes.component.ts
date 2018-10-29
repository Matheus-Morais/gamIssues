import { Component, OnInit } from '@angular/core';
import { GitlabService } from '../gitlab.service';
import { ActivatedRoute } from "@angular/router";
import { UsuarioService } from "../usuario/usuario.service";
import {UserGitLab} from '../usergitlab.model';
import { ThrowStmt } from '@angular/compiler';
import { LocaleDataIndex } from '@angular/common/src/i18n/locale_data';
//import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'gam-missoes',
  templateUrl: './missoes.component.html',
  styleUrls: ['./missoes.component.css']
})
export class MissoesComponent implements OnInit {

  user: any = null;
  projeto_id: any = null;
  issues: any = null;
  missoes: any[] = null;
  nao_realizou_missao: boolean = false;
  xp_missao: any = 0;
  
  gitlab_username = null;
  constructor(
    private gitlabService: GitlabService, 
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    this.projeto_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.gitlabService.getIDforGitlabUser().subscribe(User => {
      this.getIssues(User[0].id
        )});
    this.gitlab_username = JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_username;
    this.usuarioService.getMissoes().subscribe(Missoes => {
      this.missoes = Missoes
    });

    $(document).ready(function(){
      $('.tabs').tabs();
      $('.modal').modal();
    });

  }

  PegarMissao(issue){
    const missao = {
      nome: issue.title, 
      xp: 30, 
      status: false, 
      id_issue: issue.id, 
      id: issue.id
    };
    this.usuarioService.addMissao(missao).subscribe(Issues => {
      console.log(Issues);
    });
    location.reload();
  }

  FinalizarMissao(issue_id, id, xp){  
    this.gitlabService.getIssueState('closed').subscribe(Issue =>{      
      for (let issue of Issue){
        if(issue.id == issue_id){
          this.usuarioService.updateMissao(id).subscribe(Missao =>{ 
            console.log(xp);
            this.AtualizaXP(xp);   
            this.nao_realizou_missao = false;
            location.reload();        
          });
        }
      }
      this.nao_realizou_missao = true;
      });
  }

  AtualizaXP(xp){
    this.usuarioService.getUser().subscribe(User =>{
      console.log(JSON.parse(User.xp));
      let newXP = User.xp + xp;
      this.usuarioService.updateUsuario(newXP).subscribe();
      this.atualizarUser(newXP);
    });
  }

  atualizarUser(newXP){
    let userL = 'Usuario Logado';
    let user = JSON.parse(localStorage.getItem('Usuario Logado'));
    let myObj = {id: user.id, username: user.username, senha: user.senha, gitlab_username: user.gitlab_username, token: user.token, xp: newXP};
    localStorage.setItem(userL, JSON.stringify(myObj));
  }

  jaTemMissao(id_iss){
    for(let m of this.missoes){
      if (m.id_issue == id_iss){
        return false
      }
    }
    return true
  }

  getIssues(id){
    this.gitlabService.getIssuesUser(id).subscribe(Issues => this.issues = Issues)
  }

  ArrumarData(date){
    var data = date.split('-', 3)
    return data[2]+ '/'+ data[1]+ '/' + data[0];
  }

}

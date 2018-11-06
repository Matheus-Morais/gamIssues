import { Component, OnInit } from '@angular/core';
import { GitlabService } from '../gitlab.service';
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from "../usuario/usuario.service";

declare var $: any;

@Component({
  selector: 'gam-missoes',
  templateUrl: './missoes.component.html',
  styleUrls: ['./missoes.component.css']
})
export class MissoesComponent implements OnInit {

  user: any = null;
  projeto_id: any = null;
  issues: any = [];
  missoes: any[] = null;
  nao_realizou_missao: boolean = false;
  xp_missao: any = 0;
  jogador_id: any = null;

  gitlab_username = null;
  constructor(
    private gitlabService: GitlabService,
    private routeAc: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.projeto_id = parseInt(this.routeAc.snapshot.paramMap.get('id'));
    this.gitlabService.getIDforGitlabUser().subscribe(User => {
      this.getIssues(User[0].id)
      //this.getIssues(this.projeto_id)
    }
    );
    this.gitlab_username = JSON.parse(localStorage.getItem('Usuario Logado')).username;
    this.usuarioService.getMissoes().subscribe(Missoes => {
      this.missoes = Missoes;
      this.usuarioService.getJogador(JSON.parse(localStorage.getItem('Usuario Logado')).id, JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(Jogador => {
        this.jogador_id = Jogador.id;
      });
    });

    $(document).ready(function () {
      $('.tabs').tabs();
      $('.modal').modal();
    });

  }

  PegarTodasMissoes(issues, projeto_id) {
    let idUser = JSON.parse(localStorage.getItem('Usuario Logado')).id;
    let token = JSON.parse(localStorage.getItem('Usuario Logado')).token;
    this.usuarioService.getJogador(idUser, token).subscribe(Jogador => {
      for (let issue of issues) {
        if (projeto_id == issue.project_id && this.jaTemMissao(issue.id) && issue.state == 'opened') {

          let data_issue;
          if (issue.due_date) {
            data_issue = issue.due_date;
          }
          else {
            data_issue = "";
          }

          const missao = {
            "jogador": Jogador.id,
            "nome_missao": issue.title,
            "xp_missao": 80,
            "nice_tempo": false,
            "data": data_issue,
            "status": false,
            "id_issue": issue.id,
            "id_projeto": issue.project_id
          };
          this.usuarioService.addMissao(missao).subscribe(Missao => {
            this.AtualizarValores(Jogador.id);
          });
        }
      }
      this.router.navigate(['projetos']);
    },
      errors => {
        console.log(errors);
      });
  }

  FinalizarTodasMissoes(issues, missoes) {
    for (let issue of issues) {
      for (let missao of missoes) {
        let cond = true;
        if (issue.id == missao.id_issue && issue.state == 'closed') {
          cond = false;
          let aux = true;
          if (missao.data != '') {
            let hoje = new Date().toJSON().split('T')[0].split('-');
            let data = new Date(missao.data).toJSON().split('T')[0].split('-');
            if (parseInt(data[1]) > parseInt(hoje[1])) {
              aux = true
            }
            else if (parseInt(data[1]) == parseInt(hoje[1])) {
              if (parseInt(data[2]) >= parseInt(hoje[2])) {
                aux = true
              }
              else {
                aux = false
              }
            }
            else {
              aux = false
            }
          }

          this.usuarioService.updateMissao(missao.id, aux).subscribe(Missao => {
            this.AtualizarValores(missao.jogador);
            this.nao_realizou_missao = false;

          });
        }
      }
    }
    this.router.navigate(['projetos']);
  }

  PegarMissao(issue) {
    let idUser = JSON.parse(localStorage.getItem('Usuario Logado')).id;
    let token = JSON.parse(localStorage.getItem('Usuario Logado')).token;

    this.usuarioService.getJogador(idUser, token).subscribe(Jogador => {
      let data_issue;
      if (issue.due_date) {
        data_issue = issue.due_date;
      }
      else {
        data_issue = "";
      }

      const missao = {
        "jogador": Jogador.id,
        "nome_missao": issue.title,
        "xp_missao": 80,
        "nice_tempo": false,
        "data": data_issue,
        "status": false,
        "id_issue": issue.id,
        "id_projeto": issue.project_id
      };
      this.usuarioService.addMissao(missao).subscribe(Missao => {
        this.AtualizarValores(Jogador.id);

        this.router.navigate(['projetos']);
      });
    },
      errors => {
        console.log(errors);
      });
  }

  FinalizarMissao(issue_id, id, idJogador, data_m) {

    let cond = true;
    for (let issue of this.issues) {
      if (issue.id == issue_id && issue.state == 'closed') {
        cond = false;
        let aux = true;
        if (data_m != '') {
          let hoje = new Date().toJSON().split('T')[0].split('-');
          let data = new Date(data_m).toJSON().split('T')[0].split('-');
          if (parseInt(data[1]) > parseInt(hoje[1])) {
            aux = true
          }
          else if (parseInt(data[1]) == parseInt(hoje[1])) {
            if (parseInt(data[2]) >= parseInt(hoje[2])) {
              aux = true
            }
            else {
              aux = false
            }
          }
          else {
            aux = false
          }
        }

        this.usuarioService.updateMissao(id, aux).subscribe(Missao => {
          this.AtualizarValores(idJogador);
          this.nao_realizou_missao = false;
          this.router.navigate(['projetos']);

        });
      }
    }
    if (cond) {
      this.nao_realizou_missao = true;
    }
  }

  AtualizaMA(jogador_id, m_adquiridas) {

    let num = m_adquiridas + 1;
    this.usuarioService.updateUsuario_MA(jogador_id, num).subscribe(P_Jogador => {

    });
  }

  AtualizarValores(idJogador) {
    this.usuarioService.getMissoes().subscribe(Missoes => {
      let ms_fechada = 0;
      let ms_abertas = 0;
      let ms_data = 0;
      let xp_total = 0;
      for (let missao of Missoes) {
        if (missao.jogador == idJogador) {
          if (missao.status == true) {
            ms_fechada = ms_fechada + 1;
            xp_total = xp_total + missao.xp_missao;
          }
          else {
            ms_abertas = ms_abertas + 1;
          }
          if (missao.nice_tempo) {
            ms_data = ms_data + 1;
          }
        }
      }
      let dados = {
        "xp_total": xp_total,
        "m_realizadas": ms_fechada,
        "m_adquiridas": ms_abertas,
        "mr_nadata": ms_data,
      };

      this.usuarioService.atualizarJogador(idJogador, dados).subscribe(Jogador => {

      },
        errors => {
          console.log(errors);
        });
    });
  }

  AtualizaXP_MF(xp) {
    this.usuarioService.getUser(JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(User => {

      this.usuarioService.getJogador(User.id, JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(Jogador => {

        let newXP = Jogador.xp_total + xp;
        let newMF = Jogador.m_realizadas + 1;

        this.usuarioService.updateUsuarioXP_MF(newXP, newMF, Jogador.id).subscribe(P_Jogador => {

        });
      });

    });
  }

  atualizarUser(newXP) {
    let userL = 'Usuario Logado';
    let user = JSON.parse(localStorage.getItem('Usuario Logado'));
    let myObj = { id: user.id, username: user.username, senha: user.senha, gitlab_username: user.gitlab_username, token: user.token, xp: newXP };
    localStorage.setItem(userL, JSON.stringify(myObj));
  }

  jaTemMissao(id_iss) {
    for (let m of this.missoes) {
      if (m.id_issue == id_iss) {
        return false
      }
    }
    return true
  }

  getIssues(id) {
    for (let i = 1; i < 11; i++) {

      this.gitlabService.getIssuesUser(id, i + '').subscribe(Issues => {
        for (let i of Issues) {
          this.issues.push(i);
        }

      });
    }
  }

  ArrumarData(date) {
    var data = date.split('-', 3)
    return data[2] + '/' + data[1] + '/' + data[0];
  }

  noError() {
    this.nao_realizou_missao = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { GitlabService } from '../../gitlab.service';
import { Router } from "@angular/router";

import { Usuario } from '../usuario.model';
import { Jogador } from '../jogador.model';

@Component({
  selector: 'gam-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  username;
  senha;
  privatetoken;
  nome;
  sobrenome;
  email;
  cadastro_ok = false;
  cadastro_erro = false;

  constructor(
    private usuarioService: UsuarioService, 
    private gitlabService: GitlabService,
    private router: Router) { }

  ngOnInit() {
  }
  cadastrar() {
    this.gitlabService.getGitlabUser(this.username, this.privatetoken).subscribe(GitLabUser => {
      this.usuarioService.save(this.username, this.senha, this.privatetoken, this.nome, this.sobrenome, this.email, GitLabUser[0].avatar_url)
      .subscribe(
        usuario => {  
          this.limpar();
          this.cadastro_ok = true;
          this.router.navigate(['login']);
        },
        erro => {
          this.cadastro_erro = true;
          this.cadastro_ok = false;
        }
      );
    });
  }

  limpar() {
    this.username = null;
    this.senha = null;
    this.privatetoken = null;
    this.nome = null;
    this.sobrenome = null;
    this.email = null;
    this.privatetoken = null;
    this.cadastro_ok = false;
    this.cadastro_erro = false;
  }
}

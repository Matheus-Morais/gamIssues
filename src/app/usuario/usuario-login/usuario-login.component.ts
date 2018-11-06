import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service'

import { Usuario } from '../usuario.model';

@Component({
  selector: 'gam-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  usuarios: Usuario[]
  username;
  senha;
  erro = null;
  user = null;

  constructor(private userService: UsuarioService, private router: Router) {

  }

  ngOnInit() {
    this.user = this.userService.get();
  }

  entrar() {
    this.userService.login(this.username, this.senha)
      .subscribe(token => {

        this.erro = null;
        this.userService.getUser(token.key).subscribe(Usuario => {
          this.userService.getJogador(Usuario.id, token.key).subscribe(Jogador => {
            this.userService.set(Usuario, token.key, Jogador.private_token);
            this.router.navigate(['']);
            location.reload();
          });
        });

      },
      erro =>{
        this.erro = 'Login ou senha incorretos';
      });

  }

}

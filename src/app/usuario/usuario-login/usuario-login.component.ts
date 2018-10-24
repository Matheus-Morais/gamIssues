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
      .subscribe(usuarios => {
        if (usuarios.length > 0) {
          this.erro = null;
          console.log(usuarios[0])
          this.userService.set(usuarios[0]);
          console.log(this.userService.get())
          location.reload();

          this.router.navigate(['dashboard']);
        } else {
          this.erro = 'Login ou senha incorretos';
        }
      });

  }

}

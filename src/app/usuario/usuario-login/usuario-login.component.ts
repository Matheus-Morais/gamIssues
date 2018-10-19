import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service'

@Component({
  selector: 'gam-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  errors = false;
  username: any;
  senha: any;

  @Input() familia;
  @Output() respostaFamilia = new EventEmitter();

  constructor(
    private conexao: UsuarioService,
  ) { }


  parametros = '';

  ngOnInit() {
  }

  login() {
    console.log('xD');
    let formData = {
      "username": this.username,
      "password": this.senha
    }
    this.conexao.entrar(JSON.parse(JSON.stringify(formData))).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.key);
        console.log(data);
        this.conexao.isUserLoggedIn.next(true);
        this.errors = false;
      },
      (erros: any) => {
        console.log(erros)
        this.conexao.isUserLoggedIn.next(false);
        this.errors = true
      });
  }
}

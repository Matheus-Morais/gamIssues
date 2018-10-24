import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from '@angular/common';

import { UsuarioService } from '../usuario/usuario.service';


@Component({
  selector: 'gam-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario = null;

  constructor(private userService: UsuarioService, private router: Router, private location: Location,) {
   }

  ngOnInit() {
    this.atualizar();
  }

  logout() {
    this.userService.logout();
    this.atualizar();
    this.router.navigate(['']);
  }

  atualizar(){
    let userL = 'Usuario Logado';
    this.usuario = JSON.parse(localStorage.getItem('Usuario Logado'));
  }

}

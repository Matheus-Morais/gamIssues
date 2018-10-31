import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from "@angular/router";

@Component({
  selector: 'gam-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  usuario = null;

  constructor(private userService: UsuarioService, private router: Router) {
   }

  ngOnInit() {
    this.atualizar();
    this.navegacao();
  }
  navegacao(){
    if (!this.usuario){
      this.router.navigate(['']);
    }
    else{
      this.router.navigate(['dashboard']);
    }
  }

  atualizar(){
    let userL = 'Usuario Logado';
    this.usuario = JSON.parse(localStorage.getItem(userL));
  }
}

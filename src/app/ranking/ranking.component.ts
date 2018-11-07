import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from "@angular/router";

@Component({
  selector: 'gam-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  users_xp: any = null;
  users_ma: any = null;
  users_mf: any = null;
  users_temp: any = null;
  niveis = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680, 15360];

  usuario = null;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.atualizar();
    this.navegacao();
    
    this.usuarioService.getUsuarios().subscribe(Usuarios => {
      this.users_xp = this.getUsersPorXP(Usuarios);
      this.users_ma = this.getUsersPorMA(Usuarios);
      this.users_mf = this.getUsersPorMF(Usuarios);
      this.users_temp = this.getUsersPorTEMP(Usuarios);
    });
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

  getUsersPorXP(users){
    let usuarios = users.slice(); 
    
    for(let i = 0; i < usuarios.length; i++) {
        for(let j = 0; j < usuarios.length - 1; j++) {
            if(usuarios[j].xp_total < usuarios[j + 1].xp_total) {
                let swap = usuarios[j];
                usuarios[j] = usuarios[j + 1];
                usuarios[j + 1] = swap;
            }
        }
    }
    return usuarios;
  }

  getUsersPorMA(users){
    let usuarios = users.slice();
    for(let i = 0; i < usuarios.length; i++) {
        for(let j = 0; j < usuarios.length - 1; j++) {

            if(usuarios[j].m_adquiridas < usuarios[j + 1].m_adquiridas) {
                let swap = usuarios[j];
                usuarios[j] = usuarios[j + 1];
                usuarios[j + 1] = swap;
            }
        }
    }
    return usuarios;
  }

  getUsersPorTEMP(users){
    let usuarios = users.slice(); 
    for(let i = 0; i < usuarios.length; i++) {
        for(let j = 0; j < usuarios.length - 1; j++) {

            if(usuarios[j].mr_nadata < usuarios[j + 1].mr_nadata) {
                let swap = usuarios[j];
                usuarios[j] = usuarios[j + 1];
                usuarios[j + 1] = swap;
            }
        }
    }
    return usuarios;
  }

  getUsersPorMF(users){
    let usuarios = users.slice(); 
    for(let i = 0; i < usuarios.length; i++) {
        for(let j = 0; j < usuarios.length - 1; j++) {

            if(usuarios[j].m_realizadas < usuarios[j + 1].m_realizadas) {
                let swap = usuarios[j];
                usuarios[j] = usuarios[j + 1];
                usuarios[j + 1] = swap;
            }
        }
    }
    return usuarios;
  }

  getNivel(xp_total){
    let nivel = 0;
    for(let xp of this.niveis){
      if(xp_total >= xp){
        nivel = nivel + 1;
      }
    }
    return nivel;
  }
}

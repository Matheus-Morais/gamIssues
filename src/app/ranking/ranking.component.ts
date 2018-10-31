import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

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

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(Usuarios => {
      this.users_xp = this.getUsersPorXP(Usuarios);
      this.users_ma = this.getUsersPorMA(Usuarios);
      this.users_mf = this.getUsersPorMF(Usuarios);
      this.users_temp = this.getUsersPorTEMP(Usuarios);
    });
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
}

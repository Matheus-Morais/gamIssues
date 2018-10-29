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

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(Usuarios => {
      //console.log(Usuarios);
      this.users_xp = this.getUsersPorXP(Usuarios);
      this.users_ma = this.getUsersPorMA(Usuarios);
      this.users_mf = this.getUsersPorMF(Usuarios);
      //console.log(this.users_xp[0].username);
    });
  }

  getUsersPorXP(users){
    let usuarios = users.slice(); // creates a copy of the array
    //console.log(users[0].username);
    //console.log(usuarios[0].username);
    for(let i = 0; i < usuarios.length; i++) {
        for(let j = 0; j < usuarios.length - 1; j++) {

            if(usuarios[j].xp < usuarios[j + 1].xp) {
                let swap = usuarios[j];
                usuarios[j] = usuarios[j + 1];
                usuarios[j + 1] = swap;
            }
        }
    }
    return usuarios;
    //return 'xD';
  }

  getUsersPorMA(users){
    let usuarios = users.slice(); // creates a copy of the array
    //console.log(users[0].username);
    //console.log(usuarios[0].username);
    for(let i = 0; i < usuarios.length; i++) {
        for(let j = 0; j < usuarios.length - 1; j++) {

            if(usuarios[j].missoes_a < usuarios[j + 1].missoes_a) {
                let swap = usuarios[j];
                usuarios[j] = usuarios[j + 1];
                usuarios[j + 1] = swap;
            }
        }
    }
    return usuarios;
    //return 'xD';
  }

  getUsersPorMF(users){
    let usuarios = users.slice(); // creates a copy of the array
    //console.log(users[0].username);
    //console.log(usuarios[0].username);
    for(let i = 0; i < usuarios.length; i++) {
        for(let j = 0; j < usuarios.length - 1; j++) {

            if(usuarios[j].missoes_r < usuarios[j + 1].missoes_r) {
                let swap = usuarios[j];
                usuarios[j] = usuarios[j + 1];
                usuarios[j + 1] = swap;
            }
        }
    }
    return usuarios;
    //return 'xD';
  }
}

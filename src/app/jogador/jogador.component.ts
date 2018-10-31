import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Jogador } from '../usuario/jogador.model';

@Component({
  selector: 'gam-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit {

  usuario = null;
  public xp_total = 8;
  data = new Date('2018-10-27');
  data2 = new Date('2018-10-22');
  nivel;
  progress;
  niveis = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680, 15360];
  constructor(private usuarioService : UsuarioService) { }

  ngOnInit() {
    
    this.usuarioService.getUser(JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(
      User => {
        
        this.usuarioService.getJogador(User.id, JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(
          Jogador => {
            this.usuario = Jogador;
            
          },
          erro =>{
            this.usuario = 'Error no GetJogador';
          }
        );
      },
      erro => {
        this.usuario = 'Error no getUser';
      }
    );

  }

  getData(){
    const hoje: Date = new Date();
    if (this.data >= hoje ){
      return 'Você esta no dia certo';
    }
    else{
      return 'Voce esta atrasado';
    }
    
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
  getProgress(xp_total){
    let style
    return 'style="width: "+20+" %"';
  }

}

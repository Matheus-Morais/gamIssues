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
  niveis = ['30', '60', '120', '240', '480', '960', '1920', '3840', '7680', '15360'];
  constructor(private usuarioService : UsuarioService) { }

  ngOnInit() {
    //this.usuario = JSON.parse(localStorage.getItem('Usuario Logado'))
    this.usuarioService.getUser(JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(
      User => {
        //console.log(User.username);
        this.usuarioService.getJogador(User.id, JSON.parse(localStorage.getItem('Usuario Logado')).token).subscribe(
          Jogador => {
            this.usuario = Jogador;
            //this.getNivel(Jogador.xp_total);
            //this.progress = this.getProgress(Jogador.xp_total);
            console.log(Jogador);
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
    //return hoje;
  }

  getNivel(xp_total){
    let nivel = 0;
    for(let i; this.niveis.length; i++){
      if(xp_total >= this.niveis[i]){
        nivel = nivel + 1;
      }
    }
    this.nivel = nivel;
  }
  getProgress(xp_total){
    let style
    return 'style="width: "+20+" %"';
  }

}

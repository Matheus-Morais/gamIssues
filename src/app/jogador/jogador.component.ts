import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gam-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit {

  usuario = null;
  constructor() { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('Usuario Logado'))
  }

}

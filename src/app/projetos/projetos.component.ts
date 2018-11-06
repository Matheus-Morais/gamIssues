import { Component, OnInit } from '@angular/core';
import { GitlabService } from '../gitlab.service';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'gam-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {

  projetos: any = null;

  constructor(private gitlabService: GitlabService, private usuarioSerivce: UsuarioService) { }

  ngOnInit() {
    this.gitlabService.getProjetos(JSON.parse(localStorage.getItem('Usuario Logado')).gitlab_token).subscribe(Projetos => {
      this.projetos = Projetos;
    });

  }

}

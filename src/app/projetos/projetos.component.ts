import { Component, OnInit } from '@angular/core';
import { GitlabService } from '../gitlab.service';

@Component({
  selector: 'gam-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {

  projetos: any = null;

  constructor(private gitlabService: GitlabService) { }

  ngOnInit() {
    this.gitlabService.getProjetos().subscribe(Projetos => this.projetos = Projetos);
  }

}

import { Component, OnInit } from '@angular/core';
import { GitlabService } from '../gitlab.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'gam-missoes',
  templateUrl: './missoes.component.html',
  styleUrls: ['./missoes.component.css']
})
export class MissoesComponent implements OnInit {

  projetos: any = null;

  constructor(private gitlabService: GitlabService) { }

  ngOnInit() {
    this.projetos = this.getProjetos();
  }

  getProjetos(){
    this.gitlabService.getGroupBystro().subscribe(groupBystro => this.projetos = groupBystro)
  }

}

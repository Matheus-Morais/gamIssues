import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'gam-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  username;
  senha;
  cadastro_ok = false;
  cadastro_erro = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }
  cadastrar() {
    this.usuarioService.save(this.username, this.senha)
      .subscribe(
        usuario => {
          this.limpar();
          this.cadastro_ok = true;
        },
        erro => {
          this.cadastro_erro = true;
          this.cadastro_ok = false;
        }
      );
  }

  limpar() {
    this.username = null;
    this.senha = null;
    this.cadastro_ok = false;
    this.cadastro_erro = false;
  }
}

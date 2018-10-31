import {Usuario} from './usuario.model';

export class Jogador {
    constructor(
        public user: Usuario,
        public private_token: string,
        public xp_total: any,
        public m_realizadas: any,
        public m_adquiridas: any,
        public mr_nadata: string,
        public url_imagem: string
    ){

    }
}
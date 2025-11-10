import { Livro } from "./livro.js";
import { Usuario } from "./usuario.js";

export class Incidente {
    private usuario: Usuario;
    private livro: Livro;
    private tipo: string;
    private descricao: string;
    private dataRegistro: Date;

    constructor(usuario: Usuario, livro: Livro, tipo: string, descricao: string) {
        this.usuario = usuario;
        this.livro = livro;
        this.tipo = tipo;
        this.descricao = descricao;
        this.dataRegistro = new Date();
    }

    getUsuario(): Usuario {
        return this.usuario;
    }

    getLivro(): Livro {
        return this.livro;
    }

    getTipo(): string {
        return this.tipo;
    }

    getDescricao(): string {
        return this.descricao;
    }

    getDataRegistro(): Date {
        return this.dataRegistro;
    }

    // Método para exibir detalhes do incidente
    exibirDetalhes(): void {
        console.log(`Detalhes do Incidente`);
        console.log(`Tipo: ${this.tipo}`);
        console.log(`Livro: ${this.livro.getTitulo()}`);
        console.log(`Usuário: ${this.usuario.getNome()}`);
        console.log(`Descrição: ${this.descricao}`);
        console.log(`Data: ${this.dataRegistro.toLocaleDateString()}`);
    }
}

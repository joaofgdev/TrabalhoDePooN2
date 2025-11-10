import {Livro }  from "./livro.js";
import  {Usuario}  from "./usuario.js";

export class Reserva {
    private usuario: Usuario;
    private livro: Livro;
    private dataReserva: Date;
    private ativo: boolean;

    constructor(usuario: Usuario, livro: Livro) {
        this.usuario = usuario;
        this.livro = livro;
        this.dataReserva = new Date();
        this.ativo = true;
    }

    getUsuario(): Usuario {
        return this.usuario;
    }

    getLivro(): Livro {
        return this.livro;
    }

    getDataReserva(): Date {
        return this.dataReserva;
    }

    isAtivo(): boolean {
        return this.ativo;
    }

    cancelarReserva(): void {
        this.ativo = false;
        console.log(`A reserva do livro "${this.livro.getTitulo()}" foi cancelada.`);
    }

    disponivelParaEmprestimo(): boolean {
        return this.livro.getStatus() === "disponivel" && this.ativo;
    }
}

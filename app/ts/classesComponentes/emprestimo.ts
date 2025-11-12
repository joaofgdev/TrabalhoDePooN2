import { Livro } from "./livro.js";
import { Usuario } from "./usuario.js";

export class Emprestimo {
    private usuario: Usuario;
    private livro: Livro;
    private dataEmprestimo: Date;
    private dataDevolucao: Date;
    private devolvido: boolean;

    constructor(usuario: Usuario, livro: Livro) {
        this.usuario = usuario;
        this.livro = livro;
        this.dataEmprestimo = new Date();
        this.dataDevolucao = new Date(this.dataEmprestimo.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 dias
        this.devolvido = false;
        this.livro.emprestar();
    }

    public registrarDevolucao(): void {
        if (this.devolvido) {
            console.log(`O livro "${this.livro.getTitulo()}" já foi devolvido.`);
            return;
        }

        this.devolvido = true;
        this.livro.devolver();
        console.log(`A devolução do livro "${this.livro.getTitulo()}" foi registrada com sucesso.`);
    }

    public atrasado(): boolean {
        const hoje = new Date();
        return !this.devolvido && hoje > this.dataDevolucao;
    }

    // Getters úteis
    public getUsuario(): Usuario {
        return this.usuario;
    }

    public getLivro(): Livro {
        return this.livro;
    }

    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    public isDevolvido(): boolean {
        return this.devolvido;
    }
    public setUsuario(usuario: Usuario): void {
        this.usuario = usuario;
    }

    public setLivro(livro: Livro): void {
        this.livro = livro;
    }
    public setDataEmprestimo(data: Date): void {
        this.dataEmprestimo = data;
    }
    public setDataDevolucao(data: Date): void {
        this.dataDevolucao = data;
    }
    public setDevolvido(status: boolean): void {
        this.devolvido = status;
    }


}

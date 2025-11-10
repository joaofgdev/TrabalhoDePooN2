import { Usuario } from "./usuario.js";

export class Professor extends Usuario {
    private disciplina: string;

    constructor(nome: string, email: string, senha: string, grupo: string, disciplina: string) {
        super(nome, email, senha, grupo);
        this.disciplina = disciplina;
    }

    public getDisciplina(): string {
        return this.disciplina;
    }

    public setDisciplina(disciplina: string): void {
        this.disciplina = disciplina;
    }

    public exibirInfo(): void {
        console.log(`Professor: ${this.getNome()}, Disciplina: ${this.disciplina}, Grupo: ${this.getGrupo()}`);
    }
}

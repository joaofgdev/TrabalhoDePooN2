import { Usuario } from "./usuario";

export class Aluno extends Usuario { // Extende a classe Usuario para herdar suas propriedades e métodos
    private matricula: string;
    private curso: string;

    constructor(nome: string, email: string, senha: string, grupo: string, matricula: string, curso: string) {
        super(nome, email, senha, grupo);
        this.matricula = matricula;
        this.curso = curso;
    }

    public getMatricula(): string {
        return this.matricula;
    }

    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }

    public getCurso(): string {
        return this.curso;
    }

    public setCurso(curso: string): void {
        this.curso = curso;
    }

    public exibirInfo(): void {
        console.log(`Aluno: ${this.getNome()}, Curso: ${this.curso}, Grupo: ${this.getGrupo()}`);
    }
}

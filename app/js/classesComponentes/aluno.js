import { Usuario } from "./usuario.js";
export class Aluno extends Usuario {
    constructor(nome, email, senha, grupo, matricula, curso) {
        super(nome, email, senha, grupo);
        this.matricula = matricula;
        this.curso = curso;
    }
    getMatricula() {
        return this.matricula;
    }
    setMatricula(matricula) {
        this.matricula = matricula;
    }
    getCurso() {
        return this.curso;
    }
    setCurso(curso) {
        this.curso = curso;
    }
    exibirInfo() {
        console.log(`Aluno: ${this.getNome()}, Curso: ${this.curso}, Grupo: ${this.getGrupo()}`);
    }
}

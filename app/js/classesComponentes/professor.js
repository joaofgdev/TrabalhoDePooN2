import { Usuario } from "./usuario.js";
export class Professor extends Usuario {
    constructor(nome, email, senha, grupo, disciplina) {
        super(nome, email, senha, grupo);
        this.disciplina = disciplina;
    }
    getDisciplina() {
        return this.disciplina;
    }
    setDisciplina(disciplina) {
        this.disciplina = disciplina;
    }
    exibirInfo() {
        console.log(`Professor: ${this.getNome()}, Disciplina: ${this.disciplina}, Grupo: ${this.getGrupo()}`);
    }
}

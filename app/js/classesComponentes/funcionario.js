import { Usuario } from "./usuario.js";
export class Funcionario extends Usuario {
    constructor(nome, email, senha, grupo, cargo) {
        super(nome, email, senha, grupo);
        this.cargo = cargo;
    }
    getCargo() {
        return this.cargo;
    }
    setCargo(cargo) {
        this.cargo = cargo;
    }
    exibirInfo() {
        console.log(`Funcionário: ${this.getNome()}, Cargo: ${this.cargo}, Grupo: ${this.getGrupo()}`);
    }
}

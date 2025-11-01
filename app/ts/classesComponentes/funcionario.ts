import { Usuario } from "./usuario";

export class Funcionario extends Usuario {
    private cargo: string;

    constructor(nome: string, email: string, senha: string, grupo: string, cargo: string) {
        super(nome, email, senha, grupo);
        this.cargo = cargo;
    }

    public getCargo(): string {
        return this.cargo;
    }

    public setCargo(cargo: string): void {
        this.cargo = cargo;
    }

    public exibirInfo(): void {
        console.log(`Funcionário: ${this.getNome()}, Cargo: ${this.cargo}, Grupo: ${this.getGrupo()}`);
    }
}

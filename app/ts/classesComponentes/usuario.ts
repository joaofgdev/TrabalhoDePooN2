export class Usuario {
    private nome: string;
    private email: string;
    private senha: string;
    private grupo: string;

    constructor(nome: string, email: string, senha: string, grupo: string) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.grupo = grupo;
    }

    // Getters e Setters
    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getSenha(): string {
        return this.senha;
    }

    public setSenha(senha: string): void {
        this.senha = senha;
    }

    public getGrupo(): string {
        return this.grupo;
    }

    public setGrupo(grupo: string): void {
        this.grupo = grupo;
    }

    public exibirInfo(): void {
        console.log(`Nome: ${this.nome}, Email: ${this.email}, Grupo: ${this.grupo}`);
    }
}

export class Usuario {
    constructor(nome, email, senha, grupo) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.grupo = grupo;
    }
    // Getters e Setters
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getSenha() {
        return this.senha;
    }
    setSenha(senha) {
        this.senha = senha;
    }
    getGrupo() {
        return this.grupo;
    }
    setGrupo(grupo) {
        this.grupo = grupo;
    }
    exibirInfo() {
        console.log(`Nome: ${this.nome}, Email: ${this.email}, Grupo: ${this.grupo}`);
    }
}

export class Emprestimo {
    constructor(usuario, livro) {
        this.usuario = usuario;
        this.livro = livro;
        this.dataEmprestimo = new Date();
        this.dataDevolucao = new Date(this.dataEmprestimo.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 dias
        this.devolvido = false;
        // Marca o livro como indisponível no momento do empréstimo
        this.livro.emprestar();
    }
    // Método para registrar devolução
    registrarDevolucao() {
        if (this.devolvido) {
            console.log(`O livro "${this.livro.getTitulo()}" já foi devolvido.`);
            return;
        }
        this.devolvido = true;
        this.livro.devolver();
        console.log(`A devolução do livro "${this.livro.getTitulo()}" foi registrada com sucesso.`);
    }
    // Verifica se o empréstimo está atrasado
    atrasado() {
        const hoje = new Date();
        return !this.devolvido && hoje > this.dataDevolucao;
    }
    // Getters úteis
    getUsuario() {
        return this.usuario;
    }
    getLivro() {
        return this.livro;
    }
    getDataEmprestimo() {
        return this.dataEmprestimo;
    }
    getDataDevolucao() {
        return this.dataDevolucao;
    }
    isDevolvido() {
        return this.devolvido;
    }
}

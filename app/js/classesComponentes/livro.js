export class Livro {
    constructor(titulo, autor, isbn, quantidadeDisponivel) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.quantidadeDisponivel = quantidadeDisponivel;
        this.status = "disponivel";
    }
    // getters
    getTitulo() {
        return this.titulo;
    }
    getAutor() {
        return this.autor;
    }
    getIsbn() {
        return this.isbn;
    }
    getQuantidadeDisponivel() {
        return this.quantidadeDisponivel;
    }
    getStatus() {
        return this.status;
    }
    // setters
    setQuantidadeDisponivel(quantidade) {
        this.quantidadeDisponivel = quantidade;
    }
    setStatus(status) {
        this.status = status;
    }
    exibirDetalhes() {
        console.log(`Título: ${this.titulo}`);
        console.log(`Autor: ${this.autor}`);
        console.log(`ISBN: ${this.isbn}`);
        console.log(`Quantidade Disponível: ${this.quantidadeDisponivel}`);
        console.log(`Status: ${this.status}`);
    }
    emprestar() {
        if (this.quantidadeDisponivel > 0) {
            this.quantidadeDisponivel--;
            console.log("Livro emprestado com sucesso.");
        }
        else {
            console.log("Livro indisponível para empréstimo.");
        }
    }
    devolver() {
        this.quantidadeDisponivel++;
        console.log("Livro devolvido com sucesso.");
    }
}

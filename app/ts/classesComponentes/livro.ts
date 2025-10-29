export class Livro {
    private titulo: string;
    private autor: string;
    private isbn: string;
    private quantidadeDisponivel: number;
    private status: "disponivel" | "emprestado" | "reservado";

    constructor(titulo: string, autor: string, isbn: string, quantidadeDisponivel: number) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.quantidadeDisponivel = quantidadeDisponivel;
        this.status = "disponivel";
    }

    // getters
    getTitulo(): string {
        return this.titulo;
    }
    getAutor(): string {
        return this.autor;
    }
    getIsbn(): string {
        return this.isbn;
    }
    getQuantidadeDisponivel(): number {
        return this.quantidadeDisponivel;
    }
    getStatus(): "disponivel" | "emprestado" | "reservado" {
        return this.status;
    }

    // setters
    setQuantidadeDisponivel(quantidade: number): void {
        this.quantidadeDisponivel = quantidade;
    }
    setStatus(status: "disponivel" | "emprestado" | "reservado"): void {
        this.status = status;
    }

    exibirDetalhes(): void {
        console.log(`Título: ${this.titulo}`);
        console.log(`Autor: ${this.autor}`);
        console.log(`ISBN: ${this.isbn}`);
        console.log(`Quantidade Disponível: ${this.quantidadeDisponivel}`);
        console.log(`Status: ${this.status}`);
    }

    emprestar(): void {
        if (this.quantidadeDisponivel > 0) {
            this.quantidadeDisponivel --;
            console.log("Livro emprestado com sucesso.");
        }else {
            console.log("Livro indisponível para empréstimo.");
        }
    }

    devolver(): void {
        this.quantidadeDisponivel ++;
        console.log("Livro devolvido com sucesso.");
    }
}
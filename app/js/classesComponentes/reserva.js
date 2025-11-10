export class Reserva {
    constructor(usuario, livro) {
        this.usuario = usuario;
        this.livro = livro;
        this.dataReserva = new Date();
        this.ativo = true;
    }
    getUsuario() {
        return this.usuario;
    }
    getLivro() {
        return this.livro;
    }
    getDataReserva() {
        return this.dataReserva;
    }
    isAtivo() {
        return this.ativo;
    }
    cancelarReserva() {
        this.ativo = false;
        console.log(`A reserva do livro "${this.livro.getTitulo()}" foi cancelada.`);
    }
    disponivelParaEmprestimo() {
        // O livro precisa estar disponível e a reserva ainda ativa
        return this.livro.getStatus() === "disponivel" && this.ativo;
    }
}

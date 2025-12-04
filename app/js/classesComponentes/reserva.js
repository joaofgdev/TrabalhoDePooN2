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
    setDataReserva(data) {
        this.dataReserva = data;
    }
    getisAtivo() {
        return this.ativo;
    }
    setAtivo(ativo) {
        this.ativo = ativo;
    }
    cancelarReserva() {
        this.ativo = false;
        console.log(`A reserva do livro "${this.livro.getTitulo()}" foi cancelada.`);
    }
    disponivelParaEmprestimo() {
        return this.livro.getStatus() === "disponivel" && this.ativo;
    }
}

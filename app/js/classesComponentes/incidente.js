export class Incidente {
    constructor(usuario, livro, tipo, descricao) {
        this.usuario = usuario;
        this.livro = livro;
        this.tipo = tipo;
        this.descricao = descricao;
        this.dataRegistro = new Date();
    }
    getUsuario() {
        return this.usuario;
    }
    getLivro() {
        return this.livro;
    }
    getTipo() {
        return this.tipo;
    }
    getDescricao() {
        return this.descricao;
    }
    getDataRegistro() {
        return this.dataRegistro;
    }
    // Método para exibir detalhes do incidente
    exibirDetalhes() {
        console.log(`Detalhes do Incidente`);
        console.log(`Tipo: ${this.tipo}`);
        console.log(`Livro: ${this.livro.getTitulo()}`);
        console.log(`Usuário: ${this.usuario.getNome()}`);
        console.log(`Descrição: ${this.descricao}`);
        console.log(`Data: ${this.dataRegistro.toLocaleDateString()}`);
    }
}

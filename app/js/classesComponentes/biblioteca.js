import { Emprestimo } from "./emprestimo.js";
import { Reserva } from "./reserva.js";
export class Biblioteca {
    constructor() {
        this.livros = [];
        this.usuarios = [];
        this.emprestimos = [];
        this.reservas = [];
    }
    // MÉTODOS DE GERENCIAMENTO
    adicionarLivro(livro) {
        this.livros.push(livro);
        console.log(`Livro adicionado: ${livro.getTitulo()}`);
    }
    removerLivro(titulo) {
        this.livros = this.livros.filter(l => l.getTitulo() !== titulo);
        console.log(`Livro removido: ${titulo}`);
    }
    adicionarUsuario(usuario) {
        this.usuarios.push(usuario);
        console.log(`Usuário adicionado: ${usuario.getNome()}`);
    }
    removerUsuario(nome) {
        this.usuarios = this.usuarios.filter(u => u.getNome() !== nome);
        console.log(`Usuário removido: ${nome}`);
    }
    // MÉTODOS DE BUSCA
    buscarLivro(titulo) {
        return this.livros.find(l => l.getTitulo().toLowerCase() === titulo.toLowerCase());
    }
    buscarUsuario(nome) {
        return this.usuarios.find(u => u.getNome().toLowerCase() === nome.toLowerCase());
    }
    // EMPRÉSTIMOS
    registrarEmprestimo(usuario, livro) {
        if (!livro.getQuantidadeDisponivel()) {
            console.log(`O livro "${livro.getTitulo()}" não está disponível para empréstimo.`);
            return;
        }
        let emprestimo = new Emprestimo(usuario, livro);
        this.emprestimos.push(emprestimo);
        console.log(`Empréstimo registrado: "${livro.getTitulo()}" para ${usuario.getNome()}`);
    }
    registrarDevolucao(livro) {
        let emprestimo = this.emprestimos.find(e => e.getLivro() === livro && !e.isDevolvido());
        if (!emprestimo) {
            console.log(`Nenhum empréstimo ativo encontrado para o livro "${livro.getTitulo()}"`);
            return;
        }
        emprestimo.registrarDevolucao();
        console.log(`O livro "${livro.getTitulo()}" foi devolvido.`);
    }
    // RESERVAS
    registrarReserva(usuario, livro) {
        if (!livro.getQuantidadeDisponivel()) {
            const reserva = new Reserva(usuario, livro);
            this.reservas.push(reserva);
            console.log(`📘 Reserva criada para ${usuario.getNome()} - Livro: ${livro.getTitulo()}`);
        }
        else {
            console.log(`O livro "${livro.getTitulo()}" está disponível, não é necessário reservar.`);
        }
    }
    // LISTAGENS
    listarEmprestimosPorUsuario(nomeUsuario) {
        return this.emprestimos.filter(e => e.getUsuario().getNome() === nomeUsuario);
    }
    listarReservasPorUsuario(nomeUsuario) {
        return this.reservas.filter(r => r.getUsuario().getNome() === nomeUsuario);
    }
    listarLivros() {
        console.log("\nCatálogo de Livros:");
        this.livros.forEach(l => {
            console.log(`- ${l.getTitulo()} (${l.getQuantidadeDisponivel() ? "Disponível" : "Emprestado"})`);
        });
    }
    listarUsuarios() {
        console.log("\n👥 Usuários cadastrados:");
        this.usuarios.forEach(u => console.log(`- ${u.getNome()}`));
    }
}

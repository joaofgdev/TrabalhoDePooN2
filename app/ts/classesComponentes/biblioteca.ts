import { Livro } from "./livro";
import { Usuario } from "./usuario";
import { Emprestimo } from "./emprestimo";
import { Reserva } from "./reserva";

export class Biblioteca {
    private livros: Livro[] = [];
    private usuarios: Usuario[] = [];
    private emprestimos: Emprestimo[] = [];
    private reservas: Reserva[] = [];


    // MÉTODOS DE GERENCIAMENTO
    public adicionarLivro(livro: Livro): void {
        this.livros.push(livro);
        console.log(`Livro adicionado: ${livro.getTitulo()}`);
    }

    public removerLivro(titulo: string): void {
        this.livros = this.livros.filter(l => l.getTitulo() !== titulo);
        console.log(`Livro removido: ${titulo}`);
    }

    public adicionarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario);
        console.log(`Usuário adicionado: ${usuario.getNome()}`);
    }

    public removerUsuario(nome: string): void {
        this.usuarios = this.usuarios.filter(u => u.getNome() !== nome);
        console.log(`Usuário removido: ${nome}`);
    }

    // MÉTODOS DE BUSCA

    public buscarLivro(titulo: string): Livro {
        return this.livros.find(
            l => l.getTitulo().toLowerCase() === titulo.toLowerCase()
        );
    }

    public buscarUsuario(nome: string): Usuario  {
        return this.usuarios.find(
            u => u.getNome().toLowerCase() === nome.toLowerCase()
        );
    }

    // EMPRÉSTIMOS

    public registrarEmprestimo(usuario: Usuario, livro: Livro): void {
        if (!livro.getQuantidadeDisponivel()) {
            console.log(`O livro "${livro.getTitulo()}" não está disponível para empréstimo.`);
            return;
        }

        let emprestimo = new Emprestimo(usuario, livro);
        this.emprestimos.push(emprestimo);
        console.log(`Empréstimo registrado: "${livro.getTitulo()}" para ${usuario.getNome()}`);
    }

    public registrarDevolucao(livro: Livro): void {
        let emprestimo = this.emprestimos.find(e => e.getLivro() === livro && !e.isDevolvido());

        if (!emprestimo) {
            console.log(`Nenhum empréstimo ativo encontrado para o livro "${livro.getTitulo()}"`);
            return;
        }

        emprestimo.registrarDevolucao();
        console.log(`O livro "${livro.getTitulo()}" foi devolvido.`);
    }

    // RESERVAS
    public registrarReserva(usuario: Usuario, livro: Livro): void {
        if (!livro.getQuantidadeDisponivel()) {
            const reserva = new Reserva(usuario, livro);
            this.reservas.push(reserva);
            console.log(`📘 Reserva criada para ${usuario.getNome()} - Livro: ${livro.getTitulo()}`);
        } else {
            console.log(`O livro "${livro.getTitulo()}" está disponível, não é necessário reservar.`);
        }
    }

    // LISTAGENS
    public listarEmprestimosPorUsuario(nomeUsuario: string): Emprestimo[] {
        return this.emprestimos.filter(e => e.getUsuario().getNome() === nomeUsuario);
    }

    public listarReservasPorUsuario(nomeUsuario: string): Reserva[] {
        return this.reservas.filter(r => r.getUsuario().getNome() === nomeUsuario);
    }

    public listarLivros(): void {
        console.log("\nCatálogo de Livros:");
        this.livros.forEach(l => {
            console.log(`- ${l.getTitulo()} (${l.getQuantidadeDisponivel() ? "Disponível" : "Emprestado"})`);
        });
    }

    public listarUsuarios(): void {
        console.log("\n👥 Usuários cadastrados:");
        this.usuarios.forEach(u => console.log(`- ${u.getNome()}`));
    }
}

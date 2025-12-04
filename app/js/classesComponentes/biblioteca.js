import { Livro } from "./livro.js";
import { Usuario } from "./usuario.js";
import { Emprestimo } from "./emprestimo.js";
import { Aluno } from './aluno.js';
import { Professor } from './professor.js';
import { Funcionario } from './funcionario.js';
export class Biblioteca {
    constructor() {
        this.livros = [];
        this.usuarios = [];
        this.emprestimos = [];
        this.reservas = [];
        this.dbKey = 'phbot-db-json';
        this.carregarBancoDeDados();
    }
    // Getters
    getLivros() { return this.livros; }
    getUsuarios() { return this.usuarios; }
    getEmprestimos() { return this.emprestimos; }
    // --- MÉTODOS DE REMOÇÃO (NOVOS) ---
    removerLivroPorIsbn(isbn) {
        // Filtra mantendo apenas os livros que NÃO têm esse ISBN
        this.livros = this.livros.filter(l => l.getIsbn() !== isbn);
        this.salvarBancoDeDados();
    }
    removerUsuarioPorEmail(email) {
        // Filtra mantendo apenas os usuários que NÃO têm esse email
        this.usuarios = this.usuarios.filter(u => u.getEmail() !== email);
        this.salvarBancoDeDados();
    }
    // ----------------------------------
    carregarBancoDeDados() {
        let data = localStorage.getItem(this.dbKey);
        if (!data)
            return;
        let db = JSON.parse(data);
        this.livros = db.livros.map((l) => new Livro(l.titulo, l.autor, l.isbn, l.quantidadeDisponivel));
        this.usuarios = db.usuarios.map((data) => {
            if (data.grupo === 'aluno')
                return new Aluno(data.nome, data.email, data.senha, data.grupo, data.matricula, data.curso);
            if (data.grupo === 'professor')
                return new Professor(data.nome, data.email, data.senha, data.grupo, data.disciplina);
            if (data.grupo === 'funcionario')
                return new Funcionario(data.nome, data.email, data.senha, data.grupo, data.cargo);
            return new Usuario(data.nome, data.email, data.senha, data.grupo);
        });
        this.emprestimos = db.emprestimos.map((data) => {
            let usuario = this.buscarUsuarioPorEmail(data.usuarioEmail);
            let livro = this.buscarLivroPorIsbn(data.livroIsbn);
            if (!usuario || !livro)
                return null;
            let emp = new Emprestimo(usuario, livro);
            emp.setDataEmprestimo(new Date(data.dataEmprestimo));
            emp.setDataDevolucao(new Date(data.dataDevolucao));
            emp.setDevolvido(data.devolvido);
            return emp;
        }).filter((e) => e !== null);
    }
    salvarBancoDeDados() {
        let db = {
            livros: this.livros.map(l => ({ titulo: l.getTitulo(), autor: l.getAutor(), isbn: l.getIsbn(), quantidadeDisponivel: l.getQuantidadeDisponivel() })),
            usuarios: this.usuarios.map(u => {
                let d = { nome: u.getNome(), email: u.getEmail(), senha: u.getSenha(), grupo: u.getGrupo() };
                if (u instanceof Aluno) {
                    d.matricula = u.getMatricula();
                    d.curso = u.getCurso();
                }
                if (u instanceof Professor)
                    d.disciplina = u.getDisciplina();
                if (u instanceof Funcionario)
                    d.cargo = u.getCargo();
                return d;
            }),
            emprestimos: this.emprestimos.map(e => ({
                usuarioEmail: e.getUsuario().getEmail(),
                livroIsbn: e.getLivro().getIsbn(),
                dataEmprestimo: e.getDataEmprestimo(),
                dataDevolucao: e.getDataDevolucao(),
                devolvido: e.isDevolvido()
            })),
            reservas: []
        };
        localStorage.setItem(this.dbKey, JSON.stringify(db));
    }
    adicionarLivro(livro) {
        this.livros.push(livro);
        this.salvarBancoDeDados();
    }
    adicionarUsuario(usuario) {
        this.usuarios.push(usuario);
        this.salvarBancoDeDados();
    }
    registrarEmprestimo(usuario, livro) {
        if (livro.getQuantidadeDisponivel() > 0) {
            let emp = new Emprestimo(usuario, livro);
            this.emprestimos.push(emp);
            this.salvarBancoDeDados();
        }
        else {
            alert("Livro indisponível!");
        }
    }
    registrarDevolucao(livro, usuario) {
        let emp = this.emprestimos.find(e => e.getLivro().getIsbn() === livro.getIsbn() && e.getUsuario().getEmail() === usuario.getEmail() && !e.isDevolvido());
        if (emp) {
            emp.registrarDevolucao();
            this.salvarBancoDeDados();
        }
        else {
            alert("Empréstimo não encontrado.");
        }
    }
    buscarLivroPorIsbn(isbn) { return this.livros.find(l => l.getIsbn() === isbn); }
    buscarUsuarioPorEmail(email) { return this.usuarios.find(u => u.getEmail() === email); }
}

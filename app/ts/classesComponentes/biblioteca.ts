import * as fs from 'fs';
import { Livro } from "./livro.js";
import { Usuario } from "./usuario.js";
import { Emprestimo } from "./emprestimo.js";
import { Reserva } from "./reserva.js";
import { Aluno } from './aluno.js';
import { Professor } from './professor.js';
import { Funcionario } from './funcionario.js';

export class Biblioteca {
    private livros: Livro[] = [];
    private usuarios: Usuario[] = [];
    private emprestimos: Emprestimo[] = [];
    private reservas: Reserva[] = [];

    private readonly dbFilePath = 'banco-de-dados.json';

    constructor() {
        console.log("Iniciando a Biblioteca...");
        this.carregarBancoDeDados();
        console.log("Biblioteca pronta.");
    }
    private carregarBancoDeDados(): void {
        console.log("Verificando 'banco-de-dados.json'...");

        if (!fs.existsSync(this.dbFilePath)) {
            console.log("Arquivo não encontrado. Começando do zero.");
            this.livros = [];
            this.usuarios = [];
            this.emprestimos = [];
            this.reservas = [];
            return;
        }
        let data = fs.readFileSync(this.dbFilePath, 'utf-8');

        if (data.length === 0) {
            console.log("Arquivo está vazio. Começando do zero.");
            this.livros = [];
            this.usuarios = [];
            this.emprestimos = [];
            this.reservas = [];
            return;
        }
        let db = JSON.parse(data);

        // Carrega Livros
        this.livros = db.livros.map((l: any) => 
            new Livro(l.titulo, l.autor, l.isbn, l.quantidadeDisponivel)
        );

        // Carrega Usuários
        this.usuarios = db.usuarios.map((data: any) => {
            if (data.grupo === 'aluno') {
                return new Aluno(data.nome, data.email, data.senha, data.grupo, data.matricula, data.curso);
            }
            if (data.grupo === 'professor') {
                return new Professor(data.nome, data.email, data.senha, data.grupo, data.disciplina);
            }
            if (data.grupo === 'funcionario') {
                return new Funcionario(data.nome, data.email, data.senha, data.grupo, data.cargo);
            }
            return new Usuario(data.nome, data.email, data.senha, data.grupo);
        });

        // Carrega Empréstimos
        this.emprestimos = db.emprestimos.map((data: any) => {
            let usuario = this.buscarUsuarioPorEmail(data.usuarioEmail);
            let livro = this.buscarLivroPorIsbn(data.livroIsbn);
            if (!usuario || !livro) return null;

            let emprestimo = new Emprestimo(usuario, livro);
            emprestimo.setDataEmprestimo(new Date(data.dataEmprestimo));
            emprestimo.setDataDevolucao(new Date(data.dataDevolucao));
            emprestimo.setDevolvido(data.devolvido);
            return emprestimo;
        }).filter((e: Emprestimo | null) => e !== null);

        // Carrega Reservas
        this.reservas = db.reservas.map((data: any) => {
            const usuario = this.buscarUsuarioPorEmail(data.usuarioEmail);
            const livro = this.buscarLivroPorIsbn(data.livroIsbn);
            if (!usuario || !livro) return null;

            const reserva = new Reserva(usuario, livro);
            reserva.setDataReserva(new Date(data.dataReserva));
            reserva.setAtivo(data.ativo);
            return reserva;
        }).filter((r: Reserva | null) => r !== null);

        console.log(`✅ Banco de dados carregado: ${this.livros.length} livros, ${this.usuarios.length} usuários, ${this.emprestimos.length} empréstimos, ${this.reservas.length} reservas.`);
    }

    private salvarBancoDeDados(): void {
        console.log("Salvando banco de dados...");

        const livrosData = this.livros.map(l => ({
            titulo: l.getTitulo(),
            autor: l.getAutor(),
            isbn: l.getIsbn(),
            quantidadeDisponivel: l.getQuantidadeDisponivel(),
            status: l.getStatus()
        }));

        const usuariosData = this.usuarios.map(usuario => {
            const data: any = {
                nome: usuario.getNome(),
                email: usuario.getEmail(),
                senha: usuario.getSenha(),
                grupo: usuario.getGrupo()
            };
            if (usuario instanceof Aluno) data.matricula = usuario.getMatricula();
            if (usuario instanceof Professor) data.disciplina = usuario.getDisciplina();
            if (usuario instanceof Funcionario) data.cargo = usuario.getCargo();
            return data;
        });

        const emprestimosData = this.emprestimos.map(e => ({
            usuarioEmail: e.getUsuario().getEmail(),
            livroIsbn: e.getLivro().getIsbn(),
            dataEmprestimo: e.getDataEmprestimo(),
            dataDevolucao: e.getDataDevolucao(),
            devolvido: e.isDevolvido()
        }));

        const reservasData = this.reservas.map(r => ({
            usuarioEmail: r.getUsuario().getEmail(),
            livroIsbn: r.getLivro().getIsbn(),
            dataReserva: r.getDataReserva(),
            ativo: r.getisAtivo()
        }));

        const db = {
            livros: livrosData,
            usuarios: usuariosData,
            emprestimos: emprestimosData,
            reservas: reservasData
        };

        const data = JSON.stringify(db, null, 2);
        fs.writeFileSync(this.dbFilePath, data, 'utf-8');
        
        console.log("Banco de dados salvo com sucesso!");
    }
  
    public adicionarLivro(livro: Livro): void {
        this.livros.push(livro);
        this.salvarBancoDeDados();
        console.log(`Livro adicionado: ${livro.getTitulo()}`);
    }

    public removerLivro(titulo: string): void {
        this.livros = this.livros.filter(l => l.getTitulo().toLowerCase() !== titulo.toLowerCase());
        this.salvarBancoDeDados();
        console.log(`Livro removido: ${titulo}`);
    }

    public adicionarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario);
        this.salvarBancoDeDados();
        console.log(`Usuário adicionado: ${usuario.getNome()}`);
    }

    public removerUsuario(nome: string): void {
        this.usuarios = this.usuarios.filter(u => u.getNome().toLowerCase() !== nome.toLowerCase());
        this.salvarBancoDeDados();
        console.log(`Usuário removido: ${nome}`);
    }


    public buscarLivro(titulo: string): Livro {
        return this.livros.find(
            l => l.getTitulo().toLowerCase() === titulo.toLowerCase()
        );
    }
    private buscarLivroPorIsbn(isbn: string): Livro {
        return this.livros.find(l => l.getIsbn() === isbn);
    }

    public buscarUsuario(nome: string): Usuario {
        return this.usuarios.find(
            u => u.getNome().toLowerCase() === nome.toLowerCase()
        );
    }
    private buscarUsuarioPorEmail(email: string): Usuario {
        return this.usuarios.find(u => u.getEmail().toLowerCase() === email.toLowerCase());
    }

    public registrarEmprestimo(usuario: Usuario, livro: Livro): void {
        if (!livro.getQuantidadeDisponivel()) {
            console.log(`O livro "${livro.getTitulo()}" não está disponível para empréstimo.`);
            return;
        }

        let emprestimo = new Emprestimo(usuario, livro);
        this.emprestimos.push(emprestimo);
        this.salvarBancoDeDados();
        console.log(`Empréstimo registrado: "${livro.getTitulo()}" para ${usuario.getNome()}`);
    }

    public registrarDevolucao(livro: Livro): void {
        let emprestimo = this.emprestimos.find(e => e.getLivro() === livro && !e.isDevolvido());

        if (!emprestimo) {
            console.log(`Nenhum empréstimo ativo encontrado para o livro "${livro.getTitulo()}"`);
            return;
        }

        emprestimo.registrarDevolucao();
        this.salvarBancoDeDados();
        console.log(`O livro "${livro.getTitulo()}" foi devolvido.`);
    }

    public registrarReserva(usuario: Usuario, livro: Livro): void {
        if (!livro.getQuantidadeDisponivel()) {
            const reserva = new Reserva(usuario, livro);
            this.reservas.push(reserva);
            this.salvarBancoDeDados();
            console.log(`📘 Reserva criada para ${usuario.getNome()} - Livro: ${livro.getTitulo()}`);
        } else {
            console.log(`O livro "${livro.getTitulo()}" está disponível, não é necessário reservar.`);
        }
    }
    public listarEmprestimosPorUsuario(nomeUsuario: string): Emprestimo[] {
        return this.emprestimos.filter(e => e.getUsuario().getNome() === nomeUsuario);
    }

    public listarReservasPorUsuario(nomeUsuario: string): Reserva[] {
        return this.reservas.filter(r => r.getUsuario().getNome() === nomeUsuario);
    }

    public listarLivros(): void {
        console.log("\n--- Catálogo de Livros ---");
        if(this.livros.length === 0) console.log("Nenhum livro cadastrado.");
        this.livros.forEach(l => {
            l.exibirDetalhes(); 
        });
        console.log("------------------------------");
    }

    public mostrarTodosUsuarios(): void {
        console.log("\n--- Usuários Cadastrados ---");
        if(this.usuarios.length === 0) console.log("Nenhum usuário cadastrado.");
        this.usuarios.forEach(u => u.exibirInfo());
        console.log("--------------------------------");
    }

    public mostrarTodosEmprestimos(): void {
        console.log("\n--- Histórico de Empréstimos ---");
        if(this.emprestimos.length === 0) console.log("Nenhum empréstimo registrado.");
        this.emprestimos.forEach(e => {
            console.log(`- Livro: ${e.getLivro().getTitulo()}`);
            console.log(`  Usuário: ${e.getUsuario().getNome()}`);
            console.log(`  Data: ${e.getDataEmprestimo().toLocaleDateString()}`);
            console.log(`  Status: ${e.isDevolvido() ? 'Devolvido' : 'Emprestado'}`);
        });
        console.log("-----------------------------------");
    }

    public mostrarTodasReservas(): void {
        console.log("\n--- Reservas Ativas ---");
        const ativas = this.reservas.filter(r => r.getisAtivo());
        if(ativas.length === 0) console.log("Nenhuma reserva ativa.");
        
        ativas.forEach(r => {
            console.log(`- Livro: ${r.getLivro().getTitulo()}`);
            console.log(`  Usuário: ${r.getUsuario().getNome()}`);
            console.log(`  Data: ${r.getDataReserva().toLocaleDateString()}`);
        });
        console.log("----------------------------");
    }
}
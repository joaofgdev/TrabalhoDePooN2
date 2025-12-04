import { Biblioteca } from "../js/classesComponentes/biblioteca.js";
import { Livro } from "../js/classesComponentes/livro.js";
import { Aluno } from "../js/classesComponentes/aluno.js";
import { Professor } from "../js/classesComponentes/professor.js";
import { Funcionario } from "../js/classesComponentes/funcionario.js";

// Inicializa a biblioteca
const biblioteca = new Biblioteca();

// --- FUNÇÕES DE RENDERIZAÇÃO (DOM) ---

function atualizarTabelas() {
    // 1. ATUALIZAR TABELA DE LIVROS
    const tbodyLivros = document.getElementById("tabelaLivros") as HTMLTableSectionElement;
    tbodyLivros.innerHTML = "";
    
    const selLivro = document.getElementById("selLivro") as HTMLSelectElement;
    selLivro.innerHTML = "";

    biblioteca.getLivros().forEach(livro => {
        // Cria linha da tabela com botão de excluir
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${livro.getTitulo()}</td>
            <td>${livro.getAutor()}</td>
            <td>${livro.getIsbn()}</td>
            <td>${livro.getQuantidadeDisponivel()}</td>
            <td><button class="btn-del-livro" data-isbn="${livro.getIsbn()}" style="color:red;">Excluir</button></td>
        `;
        tbodyLivros.appendChild(tr);

        // Popula o Select de empréstimo
        if (livro.getQuantidadeDisponivel() > 0) {
            const opt = document.createElement("option");
            opt.value = livro.getIsbn();
            opt.text = livro.getTitulo();
            selLivro.appendChild(opt);
        }
    });

    // 2. ATUALIZAR TABELA DE USUÁRIOS (Novo)
    const tbodyUsuarios = document.getElementById("tabelaUsuarios") as HTMLTableSectionElement;
    tbodyUsuarios.innerHTML = "";

    const selUsuario = document.getElementById("selUsuario") as HTMLSelectElement;
    selUsuario.innerHTML = "";

    biblioteca.getUsuarios().forEach(user => {
        // Cria linha da tabela com botão de excluir
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.getNome()}</td>
            <td>${user.getEmail()}</td>
            <td>${user.getGrupo()}</td>
            <td><button class="btn-del-user" data-email="${user.getEmail()}" style="color:red;">Excluir</button></td>
        `;
        tbodyUsuarios.appendChild(tr);

        // Popula o Select de empréstimo
        const opt = document.createElement("option");
        opt.value = user.getEmail();
        opt.text = `${user.getNome()} (${user.getGrupo()})`;
        selUsuario.appendChild(opt);
    });

    // 3. ATUALIZAR TABELA DE EMPRÉSTIMOS
    const tbodyEmp = document.getElementById("tabelaEmprestimos") as HTMLTableSectionElement;
    tbodyEmp.innerHTML = "";

    biblioteca.getEmprestimos().forEach(emp => {
        if (!emp.isDevolvido()) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${emp.getLivro().getTitulo()}</td>
                <td>${emp.getUsuario().getNome()}</td>
                <td>${emp.getDataDevolucao().toLocaleDateString()}</td>
                <td><button class="btn-devolver" data-isbn="${emp.getLivro().getIsbn()}" data-email="${emp.getUsuario().getEmail()}">Devolver</button></td>
            `;
            tbodyEmp.appendChild(tr);
        }
    });

    adicionarEventosBotoesDinamicos();
}

// Função auxiliar para religar os eventos sempre que a tabela redesenha
function adicionarEventosBotoesDinamicos() {
    // Botão Devolver Livro
    document.querySelectorAll(".btn-devolver").forEach(btn => {
        btn.addEventListener("click", (e: any) => {
            const isbn = e.target.getAttribute("data-isbn");
            const email = e.target.getAttribute("data-email");
            realizarDevolucao(isbn, email);
        });
    });

    // Botão Excluir Livro
    document.querySelectorAll(".btn-del-livro").forEach(btn => {
        btn.addEventListener("click", (e: any) => {
            const isbn = e.target.getAttribute("data-isbn");
            if(confirm("Tem certeza que deseja excluir este livro?")) {
                biblioteca.removerLivroPorIsbn(isbn);
                atualizarTabelas();
            }
        });
    });

    // Botão Excluir Usuário
    document.querySelectorAll(".btn-del-user").forEach(btn => {
        btn.addEventListener("click", (e: any) => {
            const email = e.target.getAttribute("data-email");
            if(confirm("Tem certeza que deseja excluir este usuário?")) {
                biblioteca.removerUsuarioPorEmail(email);
                atualizarTabelas();
            }
        });
    });
}

// --- FUNÇÕES DE AÇÃO ---

function cadastrarLivro() {
    const titulo = (document.getElementById("tituloLivro") as HTMLInputElement).value;
    const autor = (document.getElementById("autorLivro") as HTMLInputElement).value;
    const isbn = (document.getElementById("isbnLivro") as HTMLInputElement).value;
    const qtd = parseInt((document.getElementById("qtdLivro") as HTMLInputElement).value);

    if (titulo && isbn) {
        const novoLivro = new Livro(titulo, autor, isbn, qtd);
        biblioteca.adicionarLivro(novoLivro);
        alert("Livro Cadastrado!");
        atualizarTabelas();
    } else {
        alert("Preencha os campos obrigatórios.");
    }
}

function cadastrarUsuario() {
    const tipo = (document.getElementById("tipoUsuario") as HTMLSelectElement).value;
    const nome = (document.getElementById("nomeUsuario") as HTMLInputElement).value;
    const email = (document.getElementById("emailUsuario") as HTMLInputElement).value;
    const extra = (document.getElementById("extraUsuario") as HTMLInputElement).value;

    if (nome && email) {
        let user;
        if (tipo === 'aluno') user = new Aluno(nome, email, "123", "aluno", extra, "Curso Padrão");
        else if (tipo === 'professor') user = new Professor(nome, email, "123", "professor", extra);
        else user = new Funcionario(nome, email, "123", "funcionario", extra);

        biblioteca.adicionarUsuario(user);
        alert("Usuário Cadastrado!");
        atualizarTabelas();
    }
}

function realizarEmprestimo() {
    const email = (document.getElementById("selUsuario") as HTMLSelectElement).value;
    const isbn = (document.getElementById("selLivro") as HTMLSelectElement).value;

    const user = biblioteca.buscarUsuarioPorEmail(email);
    const livro = biblioteca.buscarLivroPorIsbn(isbn);

    if (user && livro) {
        biblioteca.registrarEmprestimo(user, livro);
        atualizarTabelas();
    }
}

function realizarDevolucao(isbn: string, email: string) {
    const user = biblioteca.buscarUsuarioPorEmail(email);
    const livro = biblioteca.buscarLivroPorIsbn(isbn);
    
    if (user && livro) {
        biblioteca.registrarDevolucao(livro, user);
        alert("Devolvido com sucesso!");
        atualizarTabelas();
    }
}

// --- EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnCadastrarLivro")?.addEventListener("click", cadastrarLivro);
    document.getElementById("btnCadastrarUsuario")?.addEventListener("click", cadastrarUsuario);
    document.getElementById("btnEmprestar")?.addEventListener("click", realizarEmprestimo);

    atualizarTabelas();
});
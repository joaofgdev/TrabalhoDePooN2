
import { Biblioteca } from "./classesComponentes/biblioteca.js";
import { Livro } from "./classesComponentes/livro.js";
import { Aluno } from "./classesComponentes/aluno.js";
import { Professor } from "./classesComponentes/professor.js";
import { Funcionario } from "./classesComponentes/funcionario.js";
import { Incidente } from "./classesComponentes/incidente.js";


console.log("===== Iniciando Simulação da Biblioteca =====");
const minhaBiblioteca = new Biblioteca();

// CADASTRO DE LIVROS
console.log("\n===== Cadastrando Livros =====");
const livroPOO = new Livro("Programação Orientada a Objetos", "Autor Clássico", "123-456", 1);
const livroBD = new Livro("Banco de Dados Essencial", "Maria Autora", "789-012", 3);
const livroRedes = new Livro("Redes de Computadores", "Carlos Autor", "321-654", 2);

minhaBiblioteca.adicionarLivro(livroPOO);
minhaBiblioteca.adicionarLivro(livroBD);
minhaBiblioteca.adicionarLivro(livroRedes);

//CADASTRO DE USUÁRIOS
console.log("\n===== Cadastrando Usuários =====");
const alunoJoao = new Aluno("João Carlos", "joao.aluno@email.com", "senha123", "Graduação", "M001", "Eng. de Software");
const profAna = new Professor("Ana Professora", "ana.prof@email.com", "senha456", "Docente", "Arquitetura de Software");
const funcMario = new Funcionario("Mario Bibliotecário", "mario.func@email.com", "senha789", "Administrativo", "Bibliotecário Chefe");

minhaBiblioteca.adicionarUsuario(alunoJoao);
minhaBiblioteca.adicionarUsuario(profAna);
minhaBiblioteca.adicionarUsuario(funcMario);

const listaUsuarios = [alunoJoao, profAna, funcMario];
listaUsuarios.forEach(usuario => {
    usuario.exibirInfo();
});

// TESTE DE EMPRÉSTIMO (SUCESSO)
console.log("===== Teste de Empréstimo (Sucesso) =====");
console.log(`Tentando emprestar "${livroPOO.getTitulo()}" para ${alunoJoao.getNome()}...`);
minhaBiblioteca.registrarEmprestimo(alunoJoao, livroPOO);

console.log("----- Verificando Status do Livro (Pós-Empréstimo) -----");
livroPOO.exibirDetalhes();

//TESTE DE EMPRÉSTIMO (FALHA - INDISPONÍVEL)
console.log("===== Teste de Empréstimo (Falha - Livro Indisponível) =====");
console.log(`Tentando emprestar o *mesmo* livro "${livroPOO.getTitulo()}" para ${profAna.getNome()}...`);
minhaBiblioteca.registrarEmprestimo(profAna, livroPOO); // Deve falhar

//TESTE DE RESERVA (SUCESSO - LIVRO INDISPONÍVEL)
console.log("===== Teste de Reserva (Sucesso) =====");
console.log(`A ${profAna.getNome()} vai reservar o livro "${livroPOO.getTitulo()}"...`);
minhaBiblioteca.registrarReserva(profAna, livroPOO); // Deve ter sucesso

//TESTE DE RESERVA (FALHA - LIVRO DISPONÍVEL)
console.log("===== Teste de Reserva (Falha - Livro Disponível) =====");
console.log(`O ${funcMario.getNome()} vai tentar reservar "${livroBD.getTitulo()}" (que está disponível)...`);
minhaBiblioteca.registrarReserva(funcMario, livroBD); // Deve falhar

//TESTE DE DEVOLUÇÃO
console.log("===== Teste de Devolução =====");
console.log(`O ${alunoJoao.getNome()} está devolvendo "${livroPOO.getTitulo()}"...`);
minhaBiblioteca.registrarDevolucao(livroPOO);

console.log("----- Verificando Status do Livro (Pós-Devolução) -----");
livroPOO.exibirDetalhes();

//TESTE DE INCIDENTE
console.log("===== Teste de Incidente =====");
console.log(`O ${alunoJoao.getNome()} está registrando um incidente para "${livroBD.getTitulo()}"...`);
const incidente = new Incidente(alunoJoao, livroBD, "Dano Físico", "O livro foi devolvido com a capa rasgada.");
incidente.exibirDetalhes();

console.log("\n===== Simulação Concluída =====");
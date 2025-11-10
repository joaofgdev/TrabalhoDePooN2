// app.ts
// Este é o arquivo principal para testar o sistema da biblioteca.
// Esta versão está correta e alinhada com suas classes.
import { Biblioteca } from "./classesComponentes/biblioteca.js";
import { Livro } from "./classesComponentes/livro.js";
import { Aluno } from "./classesComponentes/aluno.js";
import { Professor } from "./classesComponentes/professor.js";
import { Funcionario } from "./classesComponentes/funcionario.js";
import { Incidente } from "./classesComponentes/incidente.js";
// 1. CRIAÇÃO DA BIBLIOTECA
console.log("===== 1. Iniciando Simulação da Biblioteca =====");
const minhaBiblioteca = new Biblioteca();
// 2. CADASTRO DE LIVROS
console.log("\n===== 2. Cadastrando Livros =====");
// Vamos criar um livro com apenas 1 cópia para testar a indisponibilidade
const livroPOO = new Livro("Programação Orientada a Objetos", "Autor Clássico", "123-456", 1);
const livroBD = new Livro("Banco de Dados Essencial", "Maria Autora", "789-012", 3);
const livroRedes = new Livro("Redes de Computadores", "Carlos Autor", "321-654", 2);
minhaBiblioteca.adicionarLivro(livroPOO);
minhaBiblioteca.adicionarLivro(livroBD);
minhaBiblioteca.adicionarLivro(livroRedes);
// 3. CADASTRO DE USUÁRIOS
console.log("\n===== 3. Cadastrando Usuários =====");
// Note que usamos seu nome, João!
const alunoJoao = new Aluno("João Carlos", "joao.aluno@email.com", "senha123", "Graduação", "M001", "Eng. de Software");
const profAna = new Professor("Ana Professora", "ana.prof@email.com", "senha456", "Docente", "Arquitetura de Software");
const funcMario = new Funcionario("Mario Bibliotecário", "mario.func@email.com", "senha789", "Administrativo", "Bibliotecário Chefe");
minhaBiblioteca.adicionarUsuario(alunoJoao);
minhaBiblioteca.adicionarUsuario(profAna);
minhaBiblioteca.adicionarUsuario(funcMario);
// 4. TESTE DE POLIMORFISMO
console.log("\n===== 4. Teste de Polimorfismo (exibirInfo) =====");
// Todos são 'Usuario' na lista, mas o método correto (de Aluno, Professor, Funcionario) será chamado.
const listaUsuarios = [alunoJoao, profAna, funcMario];
listaUsuarios.forEach(usuario => {
    usuario.exibirInfo();
});
// 5. TESTE DE EMPRÉSTIMO (SUCESSO)
console.log("\n===== 5. Teste de Empréstimo (Sucesso) =====");
console.log(`Tentando emprestar "${livroPOO.getTitulo()}" para ${alunoJoao.getNome()}...`);
minhaBiblioteca.registrarEmprestimo(alunoJoao, livroPOO);
console.log("\n----- Verificando Status do Livro (Pós-Empréstimo) -----");
// Se sua correção funcionou, deve mostrar 0 disponível e status "emprestado"
livroPOO.exibirDetalhes();
// 6. TESTE DE EMPRÉSTIMO (FALHA - INDISPONÍVEL)
console.log("\n===== 6. Teste de Empréstimo (Falha - Livro Indisponível) =====");
console.log(`Tentando emprestar o *mesmo* livro "${livroPOO.getTitulo()}" para ${profAna.getNome()}...`);
minhaBiblioteca.registrarEmprestimo(profAna, livroPOO); // Deve falhar
// 7. TESTE DE RESERVA (SUCESSO - LIVRO INDISPONÍVEL)
console.log("\n===== 7. Teste de Reserva (Sucesso) =====");
console.log(`A ${profAna.getNome()} vai reservar o livro "${livroPOO.getTitulo()}"...`);
minhaBiblioteca.registrarReserva(profAna, livroPOO); // Deve ter sucesso
// 8. TESTE DE RESERVA (FALHA - LIVRO DISPONÍVEL)
console.log("\n===== 8. Teste de Reserva (Falha - Livro Disponível) =====");
console.log(`O ${funcMario.getNome()} vai tentar reservar "${livroBD.getTitulo()}" (que está disponível)...`);
minhaBiblioteca.registrarReserva(funcMario, livroBD); // Deve falhar
// 9. TESTE DE DEVOLUÇÃO
console.log("\n===== 9. Teste de Devolução =====");
console.log(`O ${alunoJoao.getNome()} está devolvendo "${livroPOO.getTitulo()}"...`);
minhaBiblioteca.registrarDevolucao(livroPOO);
console.log("\n----- Verificando Status do Livro (Pós-Devolução) -----");
// Se sua correção funcionou, deve mostrar 1 disponível
livroPOO.exibirDetalhes();
// 10. TESTE DE INCIDENTE
console.log("\n===== 10. Teste de Incidente =====");
console.log(`O ${alunoJoao.getNome()} está registrando um incidente para "${livroBD.getTitulo()}"...`);
const incidente = new Incidente(alunoJoao, livroBD, "Dano Físico", "O livro foi devolvido com a capa rasgada.");
incidente.exibirDetalhes();
console.log("\n===== Simulação Concluída =====");

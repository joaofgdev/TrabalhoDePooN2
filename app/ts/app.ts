import { Livro } from "../js/classesComponentes/livro.js";


let livro1 = new Livro("O Senhor dos Anéis", "J.R.R. Tolkien", "978-0544003415", 5);
livro1.exibirDetalhes();
livro1.emprestar();
livro1.exibirDetalhes();
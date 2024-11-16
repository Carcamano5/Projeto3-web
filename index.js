import express from "express";
//commonjs const express = require('express')

const app = express();

//configurar aplicação para receber dados do formulario

app.use(express.urlencoded({ extended: true }));

const porta = 3000;
const host = "0.0.0.0"; //IP se refere-se a todas as interfaces locais (Placas de rede) no seu PC

var listaProds = []; //Variavel global - Lista para armazenar os cadastros
//implementar a tareda para entregar um formulario html para o cliente

function CadsProdsView(req, resp) {
  resp.send(`
        <html>
                <head>
                    <tittle>Cadastro de Alunos</tittle>
                    
                </head>
                <body>
                    <div class="container text-center">
                        <h1>Cadastro de Alunos</h1>

        <form method="POST" action="/Produto" class="row g-3">

        <div class="col-md-4">
          <label for="validationDefault01"  class="form-label">Nome Aluno:</label>
          <input type="text" class="form-control" id="nome" name="nome" value="" >
        </div>

        <div class="col-md-4">
          <label for="validationDefault02"  class="form-label">RA:</label>
          <input type="text" class="form-control" id="desc" name="desc" value="" >
        </div>
        
        </div>
        <div class="col-md-6">
          <label for="validationDefault03" name="cod" class="form-label">Email</label>
          <input type="text" class="form-control" id="cod" name="cod" >
        </div>

        
        <div class="col-12">
          <button class="btn btn-primary" type="submit">Cadastrar Aluno</button>
        </div>
      </form>

                    </div>
                </body>
                
        </html>
    `);
}

function menuView(req, resp) {
  resp.send(`
        <head>
            <tittle>Menu de cadastro de alunos</tittle>
        </head>
        <body>
             <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-md">
                    <a class="navbar-brand" href="/Produto">Cadastrar Alunos</a>
                 </div>
            </nav>
        </body>
        `);
}

function CadastraProduto(req, resp) {
  //recuperar os dados do formulario enviado para o servidor
  //adicionar o produto na lista
  const nome = req.body.nome;
  const desc = req.body.desc;
  const cod = req.body.cod;

 

  //valida dados

  if (nome && desc && desc && cod) {
    //entrada valida!

    const produtos = { nome, desc, cod };//dados validos = cria instancia
    listaProds.push(produtos);

    //mostrar a lista de produtos
    resp.write(`
            <html>
                <head>
                    <tittle>Alunos Cadastrados</tittle>
                    <meta charset = "utf-8">
                </head>

                 <body>
                    <table class="table">
                         <thead>
                        <tr>
                           
                             <th scope="col">Nome do Aluno</th>
                            <th scope="col">RA:</th>
                              <th scope="col">Email:</th>
                             </tr>
                                </thead>
                                     <tbody>`);
    //adicionar as linhas da tabela, para cada produto nos devemos criar uma linha
    for (var i = 0; i < listaProds.length; i++) {
      resp.write(`<tr>
                        <td>${listaProds[i].nome}</td>
                        <td>${listaProds[i].desc}</td>
                        <td>${listaProds[i].cod}</td>
                    </tr>`);
    }

    resp.write(`</tbody>
            </table>
             </body>
            </html>
        `);
  } //fim da validação

  else
  {
    //enviar de volta o form de cadastro contendo msg de validação
    //implementar o html com o esse conteud!
    resp.write(` <html>
                <head>
                    <tittle>Cadastro de Alunos</tittle>
                    <meta charset = "utf-8">
                    
                </head>
                <body>
                    <div class="container text-center">
                        <h1>Cadastro de Produtos</h1>

        <form method="POST" action="/Produto" class="row g-3">
        <div class="col-md-4">
          <label for="validationDefault01"  class="form-label">Nome do Aluno:</label>
          <input type="text" class="form-control" id="nome" name="nome"value="${nome}">
        </div>`);
        if(!nome || nome.length < 10)
        {
          resp.write(`
                <div>
                    <span >Porfavor Insira o nome do Aluno, ou nome menor que 10 caracteres</span>
                     
                </div>
            `);
        }
        resp.write(`
                <div class="col-md-4">
                 <label for="validationDefault02"  class="form-label">RA:</label>
                <input type="text" class="form-control" id="desc" name="desc" value="${desc}" >
        </div>
          `)
          if(!desc || desc.length < 11)
          {
            resp.write(`
              <div>
                  <span >Porfavor Insira o RA do aluno, ou ra menor que 10 caracteres</span>
              </div>
          `);
          }
          resp.write(`
                 <div class="col-md-6">
                     <label for="validationDefault03" name="cod" class="form-label">Email</label>

                      <input type="text" class="form-control" id="cod" name="cod" value="${cod}">
                  </div>
            `)
            if(!cod || !cod.includes('@') || !cod.includes('.'))
            {
              resp.write(`
                     <div>
                          <span >Porfavor Insira o email do aluno, ou email deve incluir @ e .</span>
                      </div>
                </html>`)
            }
           
        
  }//fim else

  resp.end(); //sera enviada a resposta
}

app.get("/", menuView);
app.get("/Produto", CadsProdsView); //enviar o formulario para cadastrar o aluno
//novidade desta aula é o metodo post
app.post("/Produto", CadastraProduto);

app.listen(porta, host, () => {
  console.log(
    `Servidor iniciado e em execução no endereço http:// ${host}:${porta}`
  );
});

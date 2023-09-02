const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser'); // importei o body-parser
const mongoose = require('mongoose');

console.log('Iniciando o servidor ...')
app.listen(5000,() => {
    console.log('O servidor está no ar');
});

// ***** ÍNÍCIO DA PARTE DO BANCO DE DADOS *****
// 1. Criando um esquema de banco de dados
const ProdutoSchema = { 
    nome: String ,
    preco: Number
  };
  // 2. Criando um model (gera as funções de save, find ...)
  const Produto = mongoose.model('Produto', ProdutoSchema);
  // 3. Conecta ao banco de dados
  mongoose.connect('mongodb://localhost/projeto03');
// ***** FIM DA PARTE DO BANCO DE DADOS *****

// ***** INÍCIO DA PARTE WEB *****
// Fazendo a API REST para manter o recurso 'produtos'
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/produtos', async (req,res)=>{
    res.json(await Produto.find({})); // retorna todos os produtos do banco
});
app.get('/produtos:id',(req,res)=>{
    res.send('retorna o produto com o id: ' + req.params.id);
});
app.get('/produtos/cadastrar', async (req,res)=>{
    res.json(await Produto(req.body).save()); // salva um novo produto
});
app.put('/produtos/:id', (req, res) => {
    res.send('alterar produto pelo id');
  });
  app.delete('/produtos/:id', (req, res) => {
    res.send('deletar um produto pelo id');
  });

app.use('/',router);

app.listen(process.env.port || 3000);
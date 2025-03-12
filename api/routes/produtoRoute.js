const { Router } = require('express');
const ProdutoController = require('../controllers/produtoController');
const roles = require('../middleware/roles.js');
const permissoes = require('../middleware/permissoes.js');
const permissoesRoles = require('../middleware/permissoesRoles.js');
// roles(['Gerente', 'Vendedor']),
const router = Router();

router
  .post('/produto', ProdutoController.cadastrarProduto)
  .get(
    '/produto',
    permissoesRoles(['Bailar', 'Listar']),
    ProdutoController.buscarTodosProdutos
  )
  .get('/produto/id/:id', ProdutoController.buscarProdutoPorId)
  .delete('/produto/id/:id', ProdutoController.deletarProdutoPorId)
  .put('/produto/id/:id', ProdutoController.editarProduto);

module.exports = router;

const { Router } = require('express');
const PermissaoController = require('../controllers/PermissaoController.js');

const router = Router();

router
  .post('/permissao', PermissaoController.cadastrar)
  .get('/permissao', PermissaoController.pegarTodos)
  .get('/permissao/:id', PermissaoController.pegarPorId)
  .put('/permissao/:id', PermissaoController.editar)
  .delete('/permissao/:id', PermissaoController.deletar);

module.exports = router;

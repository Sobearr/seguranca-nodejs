const { Router } = require('express');
const UsuarioController = require('../controllers/usuarioController.js');

const router = Router();

router
  .post('/usuarios', UsuarioController.cadastrar)
  .get('/usuarios', UsuarioController.pegarTodos)
  .get('/usuarios/id/:id', UsuarioController.pegarPorId)
  .put('/usuarios/id/:id', UsuarioController.editar)
  .delete('/usuarios/id/:id', UsuarioController.deletar);

module.exports = router;

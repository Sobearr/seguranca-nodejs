const { Router } = require('express');
const RoleController = require('../controllers/RoleController.js');

const router = Router();

router
  .post('/role', RoleController.cadastrar)
  .get('/role', RoleController.pegarTodos)
  .get('/role/:id', RoleController.pegarPorId)
  .put('/role/:id', RoleController.editar)
  .delete('/role/:id', RoleController.deletar);

module.exports = router;

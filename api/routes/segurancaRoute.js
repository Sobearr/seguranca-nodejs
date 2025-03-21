const { Router } = require('express');
const SegurancaController = require('../controllers/SegurancaController.js');

const router = Router();

router
  .post('/seguranca/acl', SegurancaController.cadastrarAcl)
  .post(
    '/seguranca/permissoes-roles',
    SegurancaController.cadastrarPermissoesRoles
  );

module.exports = router;

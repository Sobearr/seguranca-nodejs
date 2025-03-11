const SegurancaService = require('../services/SegurancaService.js');

const segurancaService = new SegurancaService();

class SegurancaController {
  static async cadastrarAcl(req, res) {
    const { roles, permissoes } = req.body;
    const { usuarioId } = req;

    try {
      const acl = await segurancaService.cadastrarAcl({
        roles,
        permissoes,
        usuarioId,
      });

      res.status(201).send(acl);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async cadastrarPermissoesRoles(req, res) {
    const { roleId, permissoes } = req.body;

    try {
      const permissoesCadastradas =
        await segurancaService.cadastrarPermissoesRoles({
          roleId,
          permissoes,
        });

      res.status(201).send(permissoesCadastradas);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = SegurancaController;

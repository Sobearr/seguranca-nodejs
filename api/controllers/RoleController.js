const RoleService = require('../services/RoleService');

const roleService = new RoleService();

class RoleController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;

    try {
      const role = await roleService.cadastrar({ nome, descricao });

      res.status(201).send(role);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async pegarTodos(req, res) {
    try {
      const roles = await roleService.pegarTodos();

      res.status(200).json(roles);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async pegarPorId(req, res) {
    const { id } = req.params;

    try {
      const role = await roleService.pegarPorId(id);

      res.status(200).json(role);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async editar(req, res) {
    const { id } = req.params;
    const dados = req.body;

    try {
      await roleService.editar(id, dados);
      const role = await roleService.pegarPorId(id);
      res.status(200).json(role);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async deletar(req, res) {
    const { id } = req.params;

    try {
      await roleService.deletar(id);
      res.status(200).send(`Role com id ${id} deletada com sucesso.`);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = RoleController;

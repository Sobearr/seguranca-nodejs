const PermissaoService = require('../services/PermissaoService.js');

const permissaoService = new PermissaoService();

class PermissaoController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;

    try {
      const permissao = await permissaoService.cadastrar({ nome, descricao });

      res.status(201).send(permissao);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async pegarTodos(req, res) {
    try {
      const permissao = await permissaoService.pegarTodos();

      res.status(200).json(permissao);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async pegarPorId(req, res) {
    const { id } = req.params;

    try {
      const permissao = await permissaoService.pegarPorId(id);

      res.status(200).json(permissao);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async editar(req, res) {
    const { id } = req.params;
    const dados = req.body;

    try {
      await permissaoService.editar(id, dados);
      const permissao = await permissaoService.pegarPorId(id);
      res.status(200).json(permissao);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async deletar(req, res) {
    const { id } = req.params;

    try {
      await permissaoService.deletar(id);
      res.status(200).send(`Permissao com id ${id} deletada com sucesso.`);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = PermissaoController;

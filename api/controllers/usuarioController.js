const UsuarioService = require('../services/UsuarioService.js');

const usuarioService = new UsuarioService();

class UsuarioController {
  static async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const usuario = await usuarioService.cadastrar({ nome, email, senha });

      res.status(201).json(usuario);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async pegarTodos(req, res) {
    try {
      const usuarios = await usuarioService.pegarTodos();

      res.status(200).json(usuarios);
    } catch (err) {
      res.status(400).send({ message: err.mesage });
    }
  }

  static async pegarPorId(req, res) {
    const { id } = req.params;

    try {
      const usuario = await usuarioService.pegarPorId(id);

      res.status(200).json(usuario);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async editar(req, res) {
    const { id } = req.params;
    const dados = req.body;

    try {
      await usuarioService.editar(id, dados);
      const usuario = await usuarioService.pegarPorId(id);
      res.status(200).json(usuario);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }

  static async deletar(req, res) {
    const { id } = req.params;

    try {
      await usuarioService.deletar(id);
      res.status(200).send(`Usuario com id ${id} deletado com sucesso.`);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = UsuarioController;

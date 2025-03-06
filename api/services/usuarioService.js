const db = require('../models');
const { hash } = require('bcryptjs');
const { where } = require('sequelize');
const uuid = require('uuid');

class UsuarioService {
  async cadastrar(dto) {
    const usuario = await db.usuarios.findOne({
      where: {
        email: dto.email,
      },
    });

    if (usuario) {
      throw new Error('Usuario ja cadastrado.');
    }

    try {
      const senhaHash = await hash(dto.senha, 8);

      const novoUsuario = await db.usuarios.create({
        id: uuid.v4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
      });

      return novoUsuario;
    } catch (err) {
      throw new Error('Erro ao cadastrar usuario.');
    }
  }

  async pegarTodos() {
    return await db.usuarios.findAll();
  }

  async pegarPorId(id) {
    if (!uuid.validate(id)) {
      throw new Error('Id invalido.');
    }

    try {
      const usuario = await db.usuarios.findOne({ where: { id } });
      if (!usuario) {
        throw new Error(`Usuario com id ${id} nao encontrado.`);
      }

      return usuario;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async editar(id, dados) {
    if (!uuid.validate(id)) {
      throw new Error('Id invalido.');
    }

    try {
      const usuarioAtualizado = await db.usuarios.update(
        { ...dados },
        { where: { id } }
      );

      if (usuarioAtualizado[0] !== 1) {
        throw new Error('Nao foi possivel alterar o usuario.');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deletar(id) {
    if (!uuid.validate(id)) {
      throw new Error('Id invalido.');
    }

    try {
      const numeroDeletados = await db.usuarios.destroy({ where: { id } });
      if (numeroDeletados !== 1) {
        throw new Error(`Nao foi possivel deletar o usuario com id ${id}`);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = UsuarioService;

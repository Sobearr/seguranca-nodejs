const uuid = require('uuid');
const db = require('../models');

class RoleService {
  async cadastrar(dto) {
    const role = await db.roles.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (role) {
      throw new Error('Essa role ja esta cadastrada.');
    }

    try {
      const newRole = await db.roles.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return newRole;
    } catch (err) {
      throw new Error('Erro ao cadastrar role.');
    }
  }

  async pegarTodos() {
    return await db.roles.findAll();
  }

  async pegarPorId(id) {
    if (!uuid.validate(id)) {
      throw new Error('Id invalido.');
    }

    try {
      const role = await db.roles.findOne({ where: { id } });

      if (!role) {
        throw new Error(`Role com id ${id} nao encontrada.`);
      }

      return role;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async editar(id, dados) {
    if (!uuid.validate(id)) {
      throw new Error('Id invalido.');
    }

    try {
      const roleAtualizada = await db.roles.update(
        { ...dados },
        { where: { id } }
      );

      if (roleAtualizada[0] !== 1) {
        throw new Error('Nao foi possivel alterar a role.');
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
      const numeroDeletados = await db.roles.destroy({ where: { id } });
      if (numeroDeletados !== 1) {
        throw new Error(`Nao foi possivel deletar a role com id ${id}.`);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = RoleService;

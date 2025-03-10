const db = require('../models');
const uuid = require('uuid');

class PermissaoService {
  async cadastrar(dto) {
    const permissao = await db.permissoes.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (permissao) {
      throw new Error('Essa permissao ja esta cadastrada.');
    }

    try {
      const newPermissao = await db.permissoes.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return newPermissao;
    } catch (err) {
      throw new Error('Erro ao cadastrar permissao.');
    }
  }

  async pegarTodos() {
    return await db.permissoes.findAll();
  }

  async pegarPorId(id) {
    if (!uuid.validate(id)) {
      throw new Error('Id invalido.');
    }

    try {
      const permissao = await db.permissoes.findOne({ where: { id } });

      if (!permissao) {
        throw new Error(`Permissao com id ${id} nao encontrada.`);
      }

      return permissao;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async editar(id, dados) {
    if (!uuid.validate(id)) {
      throw new Error('Id invalido.');
    }

    try {
      const permissaoAtualizada = await db.permissoes.update(
        { ...dados },
        { where: { id } }
      );

      if (permissaoAtualizada[0] !== 1) {
        throw new Error('Nao foi possivel alterar a permissao.');
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
      const numeroDeletados = await db.permissoes.destroy({ where: { id } });
      if (numeroDeletados !== 1) {
        throw new Error(`Nao foi possivel deletar a permissao com id ${id}.`);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = PermissaoService;

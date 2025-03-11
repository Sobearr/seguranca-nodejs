const db = require('../models');
const Sequelize = require('sequelize');

class SegurancaService {
  async cadastrarAcl(dto) {
    const usuario = await db.usuarios.findOne({
      include: [
        {
          model: db.roles,
          as: 'usuario_roles',
          attributes: ['id', 'nome', 'descricao'],
        },
        {
          model: db.permissoes,
          as: 'usuario_permissoes',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
      where: { id: dto.usuarioId },
    });

    if (!usuario) {
      throw new Error('Usuario nao cadastrado.');
    }

    const rolesCadastradas = await db.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.roles,
        },
      },
    });

    const pemrmissoesCadastradas = await db.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    });

    await usuario.removeUsuario_roles(usuario.usuario_roles);
    await usuario.removeUsuario_permissoes(usuario.usuario_permissoes);

    await usuario.addUsuario_roles(rolesCadastradas);
    await usuario.addUsuario_permissoes(pemrmissoesCadastradas);

    const usuarioAtualizado = await db.usuarios.findOne({
      include: [
        {
          model: db.roles,
          as: 'usuario_roles',
          attributes: ['id', 'nome', 'descricao'],
        },
        {
          model: db.permissoes,
          as: 'usuario_permissoes',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
      where: { id: dto.usuarioId },
    });

    return usuarioAtualizado;
  }

  async cadastrarPermissoesRoles(dto) {
    const role = await db.roles.findOne({
      include: [
        {
          model: db.permissoes,
          as: 'roles_das_permissoes',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
      where: { id: dto.roleId },
    });

    if (!role) {
      throw new Error('Role nao cadastrada.');
    }

    const permissoes = await db.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    });

    await role.removeRoles_das_permissoes(role.roles_das_permissoes);
    await role.addRoles_das_permissoes(permissoes);

    const roleAtualizada = await db.roles.findOne({
      include: [
        {
          model: db.permissoes,
          as: 'roles_das_permissoes',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
      where: { id: dto.roleId },
    });

    return roleAtualizada;
  }
}

module.exports = SegurancaService;

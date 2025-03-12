const db = require('../models');
const { Sequelize } = require('sequelize');

const permissoesRoles = (listaPermissoes) => {
  return async (req, res, next) => {
    // pegar id do usuario
    const { usuarioId } = req;

    // retornar usuario, se existir
    const usuario = await db.usuarios.findOne({
      include: [
        {
          model: db.roles,
          as: 'usuario_roles',
          attributes: ['id', 'nome'],
        },
      ],
      where: { id: usuarioId },
    });

    if (!usuario) {
      return res.status(401).send('Usuario nao cadastrado.');
    }

    // pegar roles do usuario
    const roles = Object.values(usuario.usuario_roles).map((role) => role.id);
    console.log('as roles sao', roles);

    if (roles.length === 0) {
      return res.status(401).send('Usuario nao possui acesso a essa rota.');
    }

    // pegar permissoes das roles
    const dadosRoles = await db.roles.findAll({
      include: [
        {
          model: db.permissoes,
          as: 'roles_das_permissoes',
          attributes: ['id', 'nome'],
        },
      ],
      where: { id: { [Sequelize.Op.in]: roles } },
    });
    const permissoes = dadosRoles.map((role) =>
      role.roles_das_permissoes.map((permissao) => permissao.nome)
    );

    console.log('permissoes sao', permissoes[0]);
    // comparar permissoes com a lista de permissoes

    const possuiPermissao = permissoes[0].some((permissao) =>
      listaPermissoes.includes(permissao)
    );

    if (!possuiPermissao) {
      return res.status(401).send('Usuario nao possui acesso a essa rota.');
    }

    return next();
  };
};

module.exports = permissoesRoles;

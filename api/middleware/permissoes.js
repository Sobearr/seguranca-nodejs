const db = require('../models');

const permissoes = (listaPermissoes) => {
  return async (req, res, next) => {
    const { usuarioId } = req;

    const usuario = await db.usuarios.findOne({
      include: [
        {
          model: db.permissoes,
          as: 'usuario_permissoes',
          attributes: ['id', 'nome'],
        },
      ],
      where: {
        id: usuarioId,
      },
    });

    if (!usuario) {
      return res.status(401).send('Usuario nao cadastrado.');
    }

    const permissoesCadastradas = usuario.usuario_permissoes
      .map((permissao) => permissao.nome)
      .some((permissao) => listaPermissoes.includes(permissao));

    if (!permissoesCadastradas) {
      return res.status(401).send('Usuario nao possui acesso a essa rota.');
    }

    return next();
  };
};

module.exports = permissoes;

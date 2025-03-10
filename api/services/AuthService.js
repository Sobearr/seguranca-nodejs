const db = require('../models/index.js');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret.js');

class AuthService {
  async login(dto) {
    const usuario = await db.usuarios.findOne({
      attributes: ['id', 'email', 'senha'],
      where: {
        email: dto.email,
      },
    });

    if (!usuario) {
      throw new Error('Usuario nao cadastrado.');
    }

    const senhasIguais = await compare(dto.senha, usuario.senha);

    if (!senhasIguais) {
      throw new Error('Usuario ou senha invalido.');
    }

    const accessToken = sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      jsonSecret.secret,
      {
        expiresIn: 86400,
      }
    );

    return { accessToken };
  }
}

module.exports = AuthService;

const config = require('../config/env');
const estados = require('../Model/estado');
const { Sequelize, Op } = require('sequelize');

let obj = config.dataConfig.POSTGRES;

// String de conexão do banco de dados
const sequelize = new Sequelize(obj.database, obj.user, obj.password, {
  host: obj.host,
  port: obj.port,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Validando a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

async function get(codigoIBGE) {
  return await estados.estados(sequelize, Sequelize).findOne({
    where: {
      codigo_ibge: codigoIBGE,
    }
  });
}

module.exports = { 
    get
};
const config = require('../config/env');
const municipioFeriado = require('../Model/municipioFeriado');
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

async function post(p) {
await municipioFeriado.municipioFeriado(sequelize, Sequelize).create(p);
}

module.exports = { 
    post
};
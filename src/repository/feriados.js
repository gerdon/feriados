const config = require('../config/env');
const feriados = require('../Model/feriados');
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

async function get(codigoIBGE, data) {
  return await feriados.feriados(sequelize, Sequelize).findOne({
    where: {
      [Op.or]: [{ codigo_ibge: codigoIBGE }, { data: data }]
    }
  });
}

async function getAll() {
  return await feriados.feriados(sequelize, Sequelize).findAll();
}

async function post(p) {
  return await feriados.feriados(sequelize, Sequelize).create(p);
}

async function put(p) {
  await feriados.feriados(sequelize, Sequelize).update(p, { 
    where: { 
      id_feriado: p.id_feriado
    } 
  });
}

async function del(codigoIBGE, data) {
  await feriados.feriados(sequelize, Sequelize).destroy({ 
    where: { 
      codigo_ibge: codigoIBGE,
      data: data
    } 
  });
}

module.exports = { 
    get, 
    getAll, 
    post, 
    put, 
    del 
};
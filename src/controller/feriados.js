const feriados = require('../service/feriados');

async function getAll(req, res) {
  return await feriados.getAll()
    .then(q => {
      return res.status(200).send(q);
    }).catch(err => {
      res.status(err.statusCode || 500).send(err);
    });
}

// Consultar feriado através do código do IBGE e a data
async function get(req, res) {
  let data = req.params.ano +"-"+ req.params.mes +"-"+ req.params.dia;

  return await feriados.get(req.params.codigoIBGE, data)
    .then(q => {
      if(q && q.statusCode) {
        return res.status(q.statusCode).send(q.msg);
      }

      return res.status(200).send(q);
    }).catch(err => {
      res.status(err.statusCode || 500).send(err);
    });
}

async function post(req, res) {
  return await feriados.post(req.body)
    .then(q => {
      return res.status(200).send('Ok');
    }).catch(err => {
      res.status(err.statusCode || 500).send(err);
    });
}

async function put(req, res) {
  return await feriados.put(req.body, req.params)
    .then(q => {
      console.log(q);
      return res.status(q).send('Ok');
    }).catch(err => {
      res.status(err.statusCode || 500).send(err);
    });
}

async function del(req, res) {
  return await feriados.del(req.params)
    .then(q => {
      return res.status(q).send('Ok');
    }).catch(err => {
      res.status(err.statusCode || 500).send(err);
    });
}

async function postNacionais(req, res) {
  return await feriados.postNacionais()
    .then(() => {
      return res.status(200).send('Ok');
    }).catch(() => {
      res.status(500).send("Error");
    });
}

module.exports = {
    getAll, 
    get, 
    post, 
    put, 
    del,
    postNacionais
};
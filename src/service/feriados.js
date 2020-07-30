const feriados = require('../repository/feriados');
const municipioFeriado = require('../repository/municipioFeriado');
const municipios = require('../repository/municipio');

async function getAll() {
  var listFeriados = await feriados.getAll();
  
  if (!listFeriados) {
    return {
      statusCode: 400,
      msg: 'Erro ao buscar os Feriados'
    };
  }

  return listFeriados;
}

async function get(codigoIBGE, data) {
  var feriado = await feriados.get(codigoIBGE, data);

  if (!feriado) {
    return {
      statusCode: 404,
      msg: 'Erro: feriado não encontrado'
    };
  }

  return feriado.nome;
}

async function post(p) {
  var feriado = await feriados.post(p);

  if (!feriado) {
    return {
      statusCode: 400,
      msg: 'Erro ao inserir feriado ' + p.name
    };
  }

  return feriado;
}

async function put(body, params) {
  let feriado = null;
  let status = null;
  let data = "2020-"+ params.mes +"-"+ params.dia;
  let temp = await feriados.get(params.codigoIBGE, data);

  if(temp && temp.dataValues) {
    temp.dataValues.nome = body.nome;
    feriado = await feriados.put(temp.dataValues);  
    status = 200;
  } else {
    let novo = {
      nome: body.nome,
      codigo_ibge: params.codigoIBGE,
      data: data
    };

    feriado = await feriados.post(novo);  
    status = 201;
  }

  // if (!feriado) {
  //   return {
  //     statusCode: 400,
  //     msg: 'Erro: Feriado não encontrado'
  //   };
  // }

  return status;
}

async function del(params) {
  let status = null;
  let data = "2020-"+ params.mes +"-"+ params.dia;
  
  if(params.codigoIBGE.length == 7) {
    return status = 403;
  }

  var feriado = await feriados.del(params.codigoIBGE, data);
  status = 204;
  
  if(!feriado) {
    return {
      statusCode: 404,
      msg: 'Erro: feriado não encontrado'
    };
  }

  // return feriado;
  return status;
}

async function postNacionais() {
  let listMunicipios = await municipios.getAll();

  let fixos = [
    { nome: "Dia do Trabalhador", codigo_ibge: null, data: "2020-05-01" },
    { nome: "Ano Novo", codigo_ibge: null, data: "2020-01-01" },
    { nome: "Tiradentes", codigo_ibge: null, data: "2020-04-21" },
    { nome: "Independência", codigo_ibge: null, data: "2020-09-07" },
    { nome: "Nossa Senhora Aparecida", codigo_ibge: null, data: "2020-10-12" },
    { nome: "Finados", codigo_ibge: null, data: "2020-11-02" },
    { nome: "Proclamação da República", codigo_ibge: null, data: "2020-11-15" },
    { nome: "Natal", codigo_ibge: null, data: "2020-12-25" },
  ];

  let moveis = [
    { nome: "Carnaval", codigo_ibge: null, data: "2020-02-25" },
    { nome: "Sexta-Feira Santa", codigo_ibge: null, data: "2020-04-10" },
    { nome: "Páscoa", codigo_ibge: null, data: "2020-04-12" }
  ];

  for(let f of fixos) {
    let newFeriado = await feriados.post(f); 
    for(let m of listMunicipios) {
      let mf = { id_municipio: m.dataValues.id_municipio, id_feriado: newFeriado.dataValues.id_feriado };  
      console.log(mf);
      await municipioFeriado.post(mf); 
    }
  }

  for(let fm of moveis) {
    let newFeriado = await feriados.post(fm); 
    for(let m of listMunicipios) {
      let mf = { id_municipio: m.dataValues.id_municipio, id_feriado: newFeriado.dataValues.id_feriado };  
      console.log(mf);
      await municipioFeriado.post(mf); 
    }
  }

}

module.exports = {
    getAll,
    get, 
    post, 
    put, 
    del,
    postNacionais
};
module.exports = {
    env: 'development',
    nomeApi: 'feriados',
    urlApi: 'http://localhost',
    portApi: 3000,
    dataConfig: {
      POSTGRES: {
        database: 'feriados',
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'postgres'
      }
    }
  };
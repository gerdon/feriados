module.exports = {
    feriados: function feriados (queryInterface, Sequelize) {
      return queryInterface.define(
        'feriado',
        {
          id_feriado: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          nome: {
            type: Sequelize.STRING
          },
          codigo_ibge: {
            type: Sequelize.STRING
          },
          data: {
            type: Sequelize.DATE,
          }
        },
        {
          timestamps: false,
          freezeTableName: true
        }
      );
    }
  };
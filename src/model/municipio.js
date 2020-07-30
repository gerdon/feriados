module.exports = {
    municipios: function municipios (queryInterface, Sequelize) {
      return queryInterface.define(
        'municipio',
        {
          id_municipio: {
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
          id_estado: {
            type: Sequelize.INTEGER
          }
        },
        {
          timestamps: false,
          freezeTableName: true
        }
      );
    }
  };
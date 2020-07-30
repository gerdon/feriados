module.exports = {
    municipioFeriado: function municipioFeriado (queryInterface, Sequelize) {
      return queryInterface.define(
        'municipio_feriado',
        {
          id_municipio_feriado: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          id_municipio: {
            type: Sequelize.INTEGER
          },
          id_feriado: {
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
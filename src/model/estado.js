module.exports = {
    estados: function estados (queryInterface, Sequelize) {
      return queryInterface.define(
        'estado',
        {
          id_estado: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          uf: {
            type: Sequelize.STRING
          },
          codigo_ibge: {
            type: Sequelize.STRING
          }
        },
        {
          timestamps: false,
          freezeTableName: true
        }
      );
    }
  };
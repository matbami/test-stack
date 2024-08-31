'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'id', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'id', {
      type: Sequelize.STRING, 
      allowNull: false,
      primaryKey: true,
    });
  },
};

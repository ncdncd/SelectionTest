'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Attendances', 'date', {
      type: Sequelize.DATE,
      after: "clock_out",
    });
    await queryInterface.addColumn('Attendances', 'isValid', {
      type: Sequelize.BOOLEAN,
      after: "date",
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Attendances', 'date', {
    });
    await queryInterface.removeColumn('Attendances', 'isValid', {
    });
    
  }
};

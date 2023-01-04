'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'accounts',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          notEmpty: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          notEmpty: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        timestamps: true,
        paranoid: true,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('accounts');
  },
};

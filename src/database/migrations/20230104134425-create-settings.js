'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'settings',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          notEmpty: true,
        },
        data_type: {
          type: Sequelize.ENUM('string', 'number', 'boolean'),
          allowNull: false,
        },
        value: {
          type: Sequelize.STRING,
          allowNull: false,
          notEmpty: true,
        },
        account_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'accounts',
            key: 'id',
          },
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
    return queryInterface.dropTable('settings');
  },
};

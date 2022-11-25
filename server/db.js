const { DataTypes, Sequelize } = require('sequelize');

// don't log SQL Statements in test environment, unless DB_LOGGING environment
// variable is explicitly set
const logging = process.env.DB_LOGGING || process.env.NODE_ENV !== 'test';

const db = new Sequelize('sqlite::memory:', { logging });

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name is a required field',
          },
        },
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User is a required field',
          },
        },
      },
});

module.exports = {db, User};
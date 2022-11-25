const { Sequelize } = require('sequelize');

// don't log SQL Statements in test environment, unless DB_LOGGING environment
// variable is explicitly set
const logging = process.env.DB_LOGGING || process.env.NODE_ENV !== 'test';

const db = new Sequelize('sqlite::memory:', { logging });

const User = db.define('User', {});

module.exports = {db, User};
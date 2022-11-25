const { db } = require('./db');

beforeAll(() => db.sync());

test.todo('User model should save with name, email');
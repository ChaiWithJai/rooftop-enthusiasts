const { DataTypes } = require("sequelize");
const { db } = require("./db");

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Name is a required field",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Email is a required field",
      },
      isEmail: {
        msg: "Email does not appear valid",
      },
    },
  },
});

module.exports = { User };

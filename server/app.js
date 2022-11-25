const bodyParser = require("body-parser");
const express = require("express");
const { db, User } = require("./db");
const { ValidationError } = require("sequelize");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send(`User with id:  ${id} not found.`);
  }

  res.json(user);
});

app.post("/users/", async ({ body }, res, next) => {
  try {
    const user = await User.create(body);
    res.json(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = err.errors.map((e) => {
        const { message, path, value } = e;
        return { message, path, value };
      });
      return res.status(400).json({
        errors,
      });
    }
    return next(err);
  }
});

module.exports = app;

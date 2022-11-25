const bodyParser = require("body-parser")
const express = require("express");
const app = express();
app.use(bodyParser.json());

const db = { users: [{ id: 123, user: "@ChaiWithJai", name: "Jai Bhagat" }] };

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = db.users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).send(`User with id:  ${id} not found.`);
  }

  res.json(user);
});

app.post("/users/", ({body}, res) => {
  // TODO:  generate nano id later
  const id = Math.floor(Math.random() * 10_000);
  const user = {...body, id};

  // Refactoring:  use ORM and database later
  db.users.push(user);

  res.json(user);
});

module.exports = app;

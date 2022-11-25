const { Router } = require("express");
const users = require("./users");

const routes = new Router();

routes.get("/", (req, res) => {
  res.json({ hello: "world" });
});

routes.use("/users", users);

module.exports = routes;

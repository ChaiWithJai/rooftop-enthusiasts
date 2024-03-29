const { Router } = require("express");
const { ValidationError } = require("sequelize");
const { User } = require("../db/User");

const router = Router();

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).send();
  }

  res.json(user);
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
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

module.exports = router;

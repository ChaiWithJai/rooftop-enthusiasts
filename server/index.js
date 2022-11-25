const PORT = process.env.PORT || 3000;
const app = require("./app");
const { db } = require("./db");

db.sync()
  .then(() => {
    app.listen(PORT, (e) => {
      if (e) throw err;
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    throw err;
  });

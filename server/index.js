const PORT = process.env.PORT || 3000;
const app = require('./app');

app.listen(PORT, (e) => {
  if (e) {
    throw e;
  }
  console.log(`Listening on port ${PORT}`);
});
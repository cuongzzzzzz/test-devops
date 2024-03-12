const app = require("./src/app");
const PORT = process.env.PORT;

app.listen(8000, () => {
  console.log("server was started at PORT : ", PORT);
});

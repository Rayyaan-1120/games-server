const app = require("./app");
const mongoose = require("mongoose");

const PORT = 5000;

mongoose
  .connect(
    "mongodb+srv://testreact123:testreact123@gameapp.db13rg4.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

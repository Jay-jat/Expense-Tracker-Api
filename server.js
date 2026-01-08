const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const app = require("./app");

connectDB();

const PORT = process.env.port || 8080;

app.listen(PORT, () => {
  console.log(`Server is working on the port ${PORT}`);
});

const express = require("express");
const res = require("express/lib/response");
const app = express();
const readFile = require("./utils/helpers");
// const uniqid = require("uniqid");
const videosRoutes = require("./routes/videosRouter");
const cors = require("cors");
// const { v4: uuidv4} = require("uuid");

const port = 8080;

app.use(express.json());
app.use(cors());

app.use("/videos/", videosRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

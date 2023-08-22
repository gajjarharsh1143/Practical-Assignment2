const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.send("hi");
});

app.listen(port, () =>
  console.log(`Server is listening on port ${port}! | http://localhost:${port}`)
);
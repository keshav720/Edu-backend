const express = require("express");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const dbConfig = require("./src/config/db.Config");

const app = express();
const port = process.env.PORT || 8000;

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});
const memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(cors());
app.options("*", cors());
app.get('/',(req,res)=>{
    res.send("Hi,we are developing educational website.");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");
const configRoutes = require("./routes");
const redis = require("redis");
const client = redis.createClient();
const cors = require("cors");
client.connect().then(() => {});

const firebase = require("./utils/firebase");
global.__basedir = __dirname;

app.use("/public", static);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configRoutes(app);

app.listen(8000, async () => {
    console.log("We've now got a server!");
    console.log("Your server routes will be running on http://localhost:8000");
});

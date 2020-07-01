const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const cors = require('cors');
const { Router } = express;
const router = Router();


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( cors() );

app.use(express.static(__dirname + "/dist/pagina"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/pagina/index.html"));
});


app.listen(process.env.PORT || 8080);

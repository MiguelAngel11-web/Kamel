const express = require("express");
const path = require("path");

const app = express();

var database = firebase.database();

var admin = require("firebase-admin");

var serviceAccount = require("../kamel-6e19d-1000f97cc92e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kamel-6e19d.firebaseio.com"
});






app.use(express.static(__dirname + "/dist/pagina"));


app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/pagina/index.html"));
});

app.listen(process.env.PORT || 8080);

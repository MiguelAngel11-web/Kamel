const express = require("express");
const path = require("path");

const app = express();


var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kamel-6e19d.firebaseio.com"
});


app.use(express.static(__dirname + "/dist/pagina"));


app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/pagina/index.html"));
});

app.listen(process.env.PORT || 8080);

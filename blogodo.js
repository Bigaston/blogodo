const express = require('express')
const bodyParser = require('body-parser');
const path = require("path")
const bdd = require("./models")

require('dotenv').config()

var app = express()

app.use(bodyParser.json());

app.use("/static", express.static('./web/static'));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "./web/index.html"))
})

app.listen(process.env.PORT, () => console.log(`Serveur lancé sur le port ${process.env.PORT}`))
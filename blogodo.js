const express = require('express')
const bodyParser = require('body-parser');
const path = require("path")
const fs = require("fs")
const file = require("./modules/file")

require('dotenv').config()

file.render()

fs.watch('./source', { encoding: 'buffer' }, (eventType, filename) => {
	file.render()
});

var app = express()

app.use(bodyParser.json());

app.get("/static/:file", (req, res) => {
	if (fs.existsSync("./static/" + req.params.file)) {
		res.sendFile(path.join(__dirname, "./static/" + req.params.file))
	} else {
		res.status(404).send(404)
	}
});

app.get("/article/:slug", (req, res) => {
	if (fs.existsSync("./build/article/" + req.params.slug + ".html")) {
		res.sendFile(path.join(__dirname, "./build/article/" + req.params.slug + ".html"))
	} else {
		res.status(404).send(404)
	}
})

app.get("/", (req, res) => {
	if (fs.existsSync("./build/index.html")) {
		res.sendFile(path.join(__dirname, "./build/index.html"))
	} else {
		res.status(404).send(404)
	}
})

app.listen(process.env.PORT, () => console.log(`Serveur lancé sur le port ${process.env.PORT}`))
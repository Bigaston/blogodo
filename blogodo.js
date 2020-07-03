const express = require('express')
const path = require("path")
const fs = require("fs")
const file = require("./modules/file")
const mustache = require("mustache")

// Vérification de la présence des dossiers de base
if (!fs.existsSync("source")) fs.mkdirSync("source")
if (!fs.existsSync("img")) fs.mkdirSync("img")
if (!fs.existsSync("build")) fs.mkdirSync("build")
if (!fs.existsSync(".env")) fs.writeFileSync(".env", `
PORT=4578
TITLE=Blogodo
DESCRIPTION=Un blog sous blogodo
HOST=http://localhost:4578
LOGO=/img/logo.jpg
BANNER=/img/banner.jpg
STAT_SCRIPT=
`)

require('dotenv').config()

// Rendu des fichiers
file.render()

// Re-rendu à chaque modification
fs.watch('./source', { encoding: 'buffer' }, (eventType, filename) => {
	file.render()
});

var app = express()

// Route d'API
app.get("/t/:tag", (req, res) => {
	if (fs.existsSync("./build/db.json")) {
		if (req.params.tag == undefined) {
			res.redirect("/")
		} else {
			var db = JSON.parse(fs.readFileSync("./build/db.json"))

			if (db.tags[req.params.tag] == undefined) {
				res.status(404).send(`Tag "${req.params.tag}" not found`)
			} else {
				const template = fs.readFileSync(__dirname + "/modules/layout_index.mustache", "utf8")
		
				obj = {
					backhome: true,
					site: {
						title: "Recherche",
						description: `Tous les articles qui contiennent le tag <strong>"${req.params.tag}"</strong> !`,
						host: process.env.HOST,
						logo: process.env.LOGO,
						banner: process.env.BANNER
					},
					articles: []
				}

				db.tags[req.params.tag].forEach(a => {
					obj.articles.push({...db.posts[a], slug: a})	
				})

				obj.articles.sort((a,b) => {
					if (!!a.pubdate && !!b.pubdate) {
						aPart = a.pubdate.split("/")
						dateA = new Date(+aPart[2], aPart[1] - 1, +aPart[0])
		
						bPart = b.pubdate.split("/")
						dateB = new Date(+bPart[2], bPart[1] - 1, +bPart[0])
						return -(dateA.getTime() - dateB.getTime());
					} else {
						return a < b ? -1 : 1
					}	
				});

				res.setHeader("content-type", "text/html");
				res.send(mustache.render(template, obj))
			}
		}
	} else {
		res.status(404).send("BDD Not Found, try later")
	}
})

// Fichiers statiques
app.get("/static/:file", (req, res) => {
	if (fs.existsSync("./static/" + req.params.file)) {
		res.sendFile(path.join(__dirname, "./static/" + req.params.file))
	} else {
		res.status(404).send("Not Found")
	}
});

// Affichage d'un article
app.get("/p/:slug", (req, res) => {
	if (fs.existsSync("./build/post/" + req.params.slug + ".html")) {
		res.sendFile(path.join(__dirname, "./build/post/" + req.params.slug + ".html"))
	} else {
		res.status(404).send("Not Found")
	}
})

// Récupération des images
app.get("/img/*", (req, res) => {
	img_url = req.path.replace("/img/", "")

	if (fs.existsSync("./img/" + img_url)) {
		res.sendFile(path.join(__dirname, "./img/" + img_url))
	} else {
		res.status(404).send("Not Found")
	}
})

// Affichage du flux RSS
app.get("/rss", (req, res) => {
	if (fs.existsSync("./build/rss.xml")) {
		res.sendFile(path.join(__dirname, "./build/rss.xml"))
	} else {
		res.status(404).send("Not Found")
	}
})

// Affichage de la page d'acceuil
app.get("/", (req, res) => {
	if (fs.existsSync("./build/index.html")) {
		res.sendFile(path.join(__dirname, "./build/index.html"))
	} else {
		res.status(404).send("Not Found")
	}
})

app.listen(process.env.PORT, () => console.log(`Serveur lancé sur le port ${process.env.PORT}`))
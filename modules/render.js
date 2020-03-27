const mustache = require("mustache")
const fs = require("fs")

module.exports = plugin;

function plugin(opts){
	return function (files, metalsmith, done){
		const template = fs.readFileSync(__dirname + "/layout.mustache", "utf8")
		site = {
			title: process.env.TITLE,
			description: process.env.DESCRIPTION,
			host: process.env.HOST,
			logo: process.env.LOGO,
			banner: process.env.BANNER
		}

		Object.keys(files).forEach(function(file){ 
			files[file].contents = files[file].contents.toString()

			tags = []
			files[file].tags.replace(/ /g, "").split(",").forEach(t => {
				tags.push({name: t})
			})

			files[file].slug = file.replace(".html", "")
			files[file].tags = tags
			files[file].contents = Buffer.from(mustache.render(template, {site: site, article: files[file]}))
		})

		done();
	};
}
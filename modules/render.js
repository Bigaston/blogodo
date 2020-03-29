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

		var tag_obj = {}
		var post_obj = {}

		Object.keys(files).forEach(function(file){ 
			files[file].contents = files[file].contents.toString()

			var tags = []
			files[file].tags.replace(/ /g, "").split(",").forEach(t => {
				tags.push({name: t})
			})

			var slug = file.replace(".html", "")
			tags.forEach(t => {
				if (tag_obj[t.name] == undefined) {
					tag_obj[t.name] = [slug]
				} else {
					tag_obj[t.name].push(slug)
				}
			})

			post_obj[slug] = {
				title: files[file].title,
				subtitle: files[file].subtitle,
				tags: files[file].tags.replace(/ /g, "").split(","),
				pubdate: files[file].pubdate
			}

			files[file].slug = slug
			files[file].tags = tags
			files[file].contents = Buffer.from(mustache.render(template, {site: site, article: files[file]}))
		})

		fs.writeFileSync("./build/db.json", JSON.stringify({tags: tag_obj, posts: post_obj}, null, 4))

		done();
	};
}
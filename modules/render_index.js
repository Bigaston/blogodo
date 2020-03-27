const mustache = require("mustache")
const fs = require("fs")
const path = require("path")

module.exports = plugin;

function plugin(opts){
	return function (files, metalsmith, done){
		const template = fs.readFileSync(__dirname + "/layout_index.mustache", "utf8")
		
		obj = {
			site: {
				title: process.env.TITLE,
				description: process.env.DESCRIPTION,
				host: process.env.HOST,
				logo: process.env.LOGO,
				banner: process.env.BANNER
			},
			articles: []
		}

		Object.keys(files).forEach(function(file){ 
			slug = file.replace(".html", "")
			o = {
				slug: slug,
				title: files[file].title,
				subtitle: files[file].subtitle,
				tags: files[file].tags,
				pubdate: files[file].pubdate
			}

			obj.articles.push(o)
		})

		obj.articles.sort((a,b) => {
			aPart = a.pubdate.split("/")
			dateA = new Date(+aPart[2], aPart[1] - 1, +aPart[0])

			bPart = b.pubdate.split("/")
			dateB = new Date(+bPart[2], bPart[1] - 1, +bPart[0])

			return -(dateA.getTime() - dateB.getTime());
		});

		fs.writeFileSync(path.join(__dirname, "../build/index.html"), mustache.render(template, obj))

		done();
	};
}
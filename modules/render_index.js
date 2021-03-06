const mustache = require("mustache")
const fs = require("fs")
const path = require("path")
const package = require("../package.json")

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
				banner: process.env.BANNER,
				stat_script: !!process.env.STAT_SCRIPT ? process.env.STAT_SCRIPT : undefined
			},
			articles: [],
			version: package.version
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

		fs.writeFileSync(path.join(__dirname, "../build/index.html"), mustache.render(template, obj))

		done();
	};
}
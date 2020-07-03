const fs = require("fs")
const path = require("path")
const package = require("../package.json")
var RSS = require('rss');
 
module.exports = plugin;

function plugin(opts){
	return function (files, metalsmith, done){
        var feed = new RSS({
            title: process.env.TITLE,
            description: process.env.DESCRIPTION,
            feed_url: process.env.HOST + "/rss",
            site_url: process.env.HOST,
            image_url: process.env.HOST + process.env.LOGO,
            generator: "Blogodo (v" + package.version + ")",
            language: "fr"
        });

		Object.keys(files).forEach(function(file){ 
            var dateParts = files[file].pubdate.split("/")

            feed.item({
                title: files[file].title,
                description: files[file].subtitle,
                url: process.env.HOST + "/p/" + file.replace(".md", ""),
                guid: file.replace(".md", ""),
                date: new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
            })
        })

        feed.items.sort((a,b) => {
            return a.date > b.date ? -1 : 1
		});

        fs.writeFileSync(path.join(__dirname, "../build/rss.xml"), feed.xml());

		done();
	};
}
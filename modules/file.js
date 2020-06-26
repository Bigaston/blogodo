const Metalsmith = require("metalsmith")
const markdown = require('metalsmith-markdown');
const render = require("./render")
const render_index = require("./render_index")
const rss = require("./rss")

module.exports = {
	render: () => {
		console.log("Rendu en cours...")
		Metalsmith(__dirname)
		.source('../source')      
		.destination('../build/post')
		.clean(true)
		.use(rss())                  
		.use(markdown())
		.use(render())
		.use(render_index())
		.build(function(err) {    
		  if (err) throw err;
		  console.log("Rendu terminé!")
		});
	}
}
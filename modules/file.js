const Metalsmith = require("metalsmith")
const markdown = require('metalsmith-markdown');
const render = require("./render")
const render_index = require("./render_index")

module.exports = {
	render: () => {
		console.log("Rendu en cours...")
		Metalsmith(__dirname)
		.source('../source')      
		.destination('../build/post')
		.clean(true)                  
		.use(markdown())
		.use(render())
		.use(render_index())
		.build(function(err) {    
		  if (err) throw err;
		  console.log("Rendu terminé!")
		});
	}
}
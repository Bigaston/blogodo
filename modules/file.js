const fs = require("fs")
const path = require("path")
const Metalsmith = require("metalsmith")
const markdown = require('metalsmith-markdown');
const render = require("./render")
const render_index = require("./render_index")

module.exports = {
	render: () => {
		Metalsmith(__dirname)
		.source('../source')      
		.destination('../build/post')
		.clean(true)                  // do not clean destination
		.use(markdown())
		.use(render())
		.use(render_index())
		.build(function(err) {    
		  if (err) throw err;
		});
	}
}
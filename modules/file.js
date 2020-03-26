const fs = require("fs")
const path = require("path")
const Metalsmith = require("metalsmith")
const markdown = require('metalsmith-markdown');
const render = require("./render")

module.exports = {
	render: () => {
		Metalsmith(__dirname)
		.source('../source')      
		.destination('../build')
		.clean(true)                  // do not clean destination
		.use(markdown())
		.use(render())
		.build(function(err) {    
		  if (err) throw err;
		});
	}
}
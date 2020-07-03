module.exports = plugin;

function plugin(opts){
	return function (files, metalsmith, done){
		Object.keys(files).forEach(function(file){ 
            if (file.startsWith(".")) {
                delete files[file];
            }
        })

		done();
	};
}
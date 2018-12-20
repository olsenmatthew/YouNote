console.log("common");
requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
	baseurl: "",
	paths: {
		mongoose : "node_modules/mongoose/index"
	}
    // nodeRequire: require
});

requirejs(['mongoose'],
function   (mongoose) {
    console.log("mongoose is loaded");
});

// define(function (require, exports, module) {
//
//   module.exports = {
//     Combobox: require('./combobox'),
//     Option: require('./option')
//   };
//
// });

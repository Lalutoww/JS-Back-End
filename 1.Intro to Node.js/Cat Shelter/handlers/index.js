const homeHandler = require('./home.js');
const staticHandler = require('./static-files.js');
const catHandler = require('./cat.js')
const searchHandler = require('./search.js')

module.exports = [homeHandler,staticHandler,catHandler,searchHandler];
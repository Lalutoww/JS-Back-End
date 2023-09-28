//Imports
const handlebars = require('express-handlebars');

//Set up hbs as view engine in express
const handlebarsConfig = (app)=>{
    app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
    app.set('view engine', 'hbs');
    app.set('views', 'src/views');
};

module.exports = handlebarsConfig;
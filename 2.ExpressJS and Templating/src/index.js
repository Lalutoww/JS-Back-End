//Imports
const express = require('express');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const expressConfig = require('./config/expressConfig.js');
const routes = require('./router.js');

const app = express();
const { PORT } = require('./constants.js');

//Set app to use handlebars engine
handlebarsConfig(app);
//add static files middleware
expressConfig(app);

//Routing middleware
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

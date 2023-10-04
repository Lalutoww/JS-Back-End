//Imports
const express = require('express');

const handlebarsConfig = require('./config/handlebarsConfig.js');
const expressConfig = require('./config/expressConfig.js');
const dbConnect = require('./config/dbConfig.js');
const routes = require('./router.js');

const app = express();
const { PORT } = require('./constants.js');

//Set app to use handlebars engine
handlebarsConfig(app);
//add static files middleware
expressConfig(app);

//Connect database
dbConnect().then(()=>console.log('Connected to DB successfully')).catch((err)=>console.log(`An error occured while connecting to DB: ${err}`));

//Routing middleware
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

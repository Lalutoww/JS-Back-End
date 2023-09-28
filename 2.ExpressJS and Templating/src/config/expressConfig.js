//Imports
const express = require('express');
const path = require('path');

//Load static files such as css and images and use bodyparser(req.body) (middlewares)
const expressConfig = (app) => {
   app.use(express.static(path.resolve(__dirname, '../public')));
   app.use(express.urlencoded({ extended: false }));
};

module.exports = expressConfig;

//Imports
const router = require('express').Router();
const cubeService = require('../services/cubeService.js');


//Home page
router.get('/', (req, res) => {
   const {search, from, to} = req.query;
   const cubes = cubeService.getAll(search,from,to);
   res.render('index', { cubes, search, from, to });
});

//About page
router.get('/about', (req, res) => {
   res.render('about');
});

//Error page
router.get('/404', (req, res) => {
   res.render('404');
});


//Export router because it gives an error if not exported and must be used in router.js
module.exports = router;

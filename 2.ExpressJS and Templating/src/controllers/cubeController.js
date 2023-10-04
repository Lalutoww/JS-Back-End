//Imports
const router = require('express').Router();
const cubeService = require('../services/cubeService.js');

//Create Page [GET,POST]
router.get('/create', (req, res) => {
   res.render('cube/create');
});

router.post('/create', async (req, res) => {
   const { name, description, imageUrl, difficultyLevel } = req.body; //that's where bodyparser is needed

   await cubeService.create({
      name,
      description,
      imageUrl,
      difficultyLevel: Number(difficultyLevel),
   });
   res.redirect('/');
});

//Details Page
router.get('/details/:cubeId', async (req, res) => {
   const { cubeId } = req.params;
   const cube = await cubeService.getSingleCube(cubeId);

   if (!cube) {
      res.redirect('/404');
      return;
   }
   res.render('cube/details', { cube });
});

//Export router because it gives an error if not exported and must be used in router.js
module.exports = router;

//Imports
const router = require('express').Router();
const cubeService = require('../services/cubeService.js');
const accessoryService = require('../services/accessoryService.js');

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
   const hasAccessories = cube.accessories?.length > 0; // if it has length show it if not be undefined
   res.render('cube/details', {cube, hasAccessories});
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
   const { cubeId } = req.params;
   const cube = await cubeService.getSingleCube(cubeId)

 const accessories = await accessoryService
   .getWithoutOwned(cube.accessories)
   .lean();
   
   const hasAccessories = accessories.length > 0;

   res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
   const { cubeId } = req.params;
   const { accessory: accessoryId } = req.body;

   await cubeService.attachAccessory(cubeId, accessoryId);

   res.redirect(`/cubes/details/${cubeId}`);
});
//Export router because it gives an error if not exported and must be used in router.js
module.exports = router;

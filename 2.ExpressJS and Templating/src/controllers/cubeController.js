//Imports
const router = require('express').Router();
const cubeService = require('../services/cubeService.js');
const accessoryService = require('../services/accessoryService.js');
const { httpOptionsSelector } = require('../utils/httpOptionsSelector.js');

//Create Page [GET,POST]
router.get('/create', (req, res) => {
   res.render('cube/create');
});

router.post('/create', async (req, res) => {
   const { name, description, imageUrl, difficultyLevel } = req.body; //that's where bodyparser is needed
   console.log(req.user);

   await cubeService.create({
      name,
      description,
      imageUrl,
      difficultyLevel: Number(difficultyLevel),
      owner: req.user, //adds cookie token
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
   const isOwner = cube.owner?.toString() === req.user?._id;
   const hasAccessories = cube.accessories?.length > 0; // if it has length show it if not be undefined
   res.render('cube/details', { cube, hasAccessories, isOwner});
});

//Attach accessory page
router.get('/:cubeId/attach-accessory', async (req, res) => {
   const { cubeId } = req.params; //access req.params by ':' symbol
   const cube = await cubeService.getSingleCube(cubeId);

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

router.get('/:cubeId/edit', async (req, res) => {
   const { cubeId } = req.params;
   const cube = await cubeService.getSingleCube(cubeId);
   const options = httpOptionsSelector(cube.difficultyLevel);

   res.render('cube/edit', { cube, options });
});

router.post('/:cubeId/edit', async (req, res) => {
   const { cubeId } = req.params;
   const { name, imageUrl, difficultyLevel, description } = req.body;
   const payload = { name, imageUrl, difficultyLevel, description };
 
   await cubeService.update(cubeId, payload);
 
   res.redirect(`/cubes/details/${cubeId}`);
})

router.get('/:cubeId/delete', async (req, res) => {
   const { cubeId } = req.params;
   const cube = await cubeService.getSingleCube(cubeId);
   const options = httpOptionsSelector(cube.difficultyLevel);

   res.render('cube/delete', { cube, options });
});

router.post('/:cubeId/delete', async (req, res) => {
   const { cubeId } = req.params;
   await cubeService.delete(cubeId);

   res.redirect('/');
});

//Export router because it gives an error if not exported and must be used in router.js
module.exports = router;

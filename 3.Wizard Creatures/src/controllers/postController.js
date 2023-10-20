const router = require('express').Router();
const creatureService = require('../services/creatureService.js');

router.get('/all', async (req, res) => {
   const creatures = await creatureService.getAll().lean();
   res.render('post/all-posts', { creatures });
});

router.get('/create', (req, res) => {
   res.render('post/create');
});

router.post('/create', async (req, res) => {
   const { name, species, skinColor, eyeColor, image, description } = req.body;
   const payload = {
      name,
      species,
      skinColor,
      eyeColor,
      image,
      description,
      owner: req.user,
   };
   await creatureService.create(payload);

   res.redirect('/posts/all');
});

router.get('/details/:creatureId', async (req, res) => {
   const { creatureId } = req.params;
   const creature = await creatureService.getSingleCreature(creatureId).lean();

   const { user } = req;
   const { owner } = creature;
   const isOwner = user?._id === owner.toString();

   res.render('post/details', { creature, isOwner });
});

router.get('/edit/:creatureId', async (req, res) => {
   const { creatureId } = req.params;
   const creature = await creatureService.getSingleCreature(creatureId).lean();
   res.render('post/edit', { creature });
});

router.post('/edit/:creatureId', async (req, res) => {
   const { creatureId } = req.params;
   const { name, species, skinColor, eyeColor, image, description } = req.body;
   const payload = {
      name,
      species,
      skinColor,
      eyeColor,
      image,
      description,
      owner: req.user,
   };
   await creatureService.update(creatureId, payload);
   res.redirect('/posts/all');
});

router.get('/delete/:creatureId', async (req, res) => {
   const { creatureId } = req.params;
   await creatureService.delete(creatureId);
   res.redirect('/posts/all');
});

router.get('/profile', (req, res) => {
   res.render('post/my-posts');
});

module.exports = router;

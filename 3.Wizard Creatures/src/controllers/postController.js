const router = require('express').Router();
const creatureService = require('../services/creatureService.js');
const { extractErrorMessages } = require('../utils/errorHandler.js');
const { isAuth } = require('../middlewares/authMiddleware.js');

router.get('/all', async (req, res) => {
   const creatures = await creatureService.getAll().lean();
   res.render('post/all-posts', { creatures });
});

router.get('/create', isAuth, (req, res) => {
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
   try {
      await creatureService.create(payload);
      res.redirect('/posts/all');
   } catch (error) {
      const errorMessages = extractErrorMessages(error);
      res.status(404).render('post/create', { errorMessages });
   }
});

router.get('/details/:creatureId', async (req, res) => {
   const { creatureId } = req.params;
   const creature = await creatureService.getSingleCreature(creatureId).lean();

   const { user } = req;
   const { owner } = creature;
   const isOwner = user?._id === owner._id.toString();
   const hasVoted = creature.votes?.some(
      (v) => v?._id.toString() === user?._id
   );
   const voterEmails = creature.votes.map((v) => v.email).join(', ');

   res.render('post/details', { creature, isOwner, hasVoted, voterEmails });
});

router.get('/edit/:creatureId', isAuth, async (req, res) => {
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
   try {
      await creatureService.update(creatureId, payload);
      res.redirect('/posts/all');
   } catch (error) {
      const errorMessages = extractErrorMessages(error);
      res.status(404).render('post/edit', { errorMessages });
   }
});

router.get('/delete/:creatureId', async (req, res) => {
   const { creatureId } = req.params;
   await creatureService.delete(creatureId);
   res.redirect('/posts/all');
});

router.get('/profile', isAuth, async (req, res) => {
   const { user } = req;
   const myCreatures = await creatureService.getMyCreatures(user?._id).lean();

   res.render('post/my-posts', { myCreatures });
});

router.get('/vote/:creatureId', async (req, res) => {
   const { creatureId } = req.params;
   const { user } = req;

   await creatureService.addVotesToCreature(creatureId, user._id);
   res.redirect(`/posts/details/${creatureId}`);
});

module.exports = router;

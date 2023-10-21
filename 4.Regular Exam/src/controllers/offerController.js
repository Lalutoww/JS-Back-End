const router = require('express').Router();
const offerService = require('../services/offerService.js');
const { extractErrorMessages } = require('../utils/errorHandler.js');
const {
   isGuest,
   isUser,
   preventOwnersBuy,
} = require('../middlewares/authMiddleware.js');
const { ownershipGuard } = require('../middlewares/authMiddleware.js');

router.get('/catalog', async (req, res) => {
   const offers = await offerService.getAll().lean();
   res.render('offer/catalog', { offers });
});

router.get('/details/:offerId', async (req, res) => {
   const { offerId } = req.params;
   const offer = await offerService.getSingleOffer(offerId).lean();
   const { user } = req;
   const { owner } = offer;
   const isOwner = user?._id === owner.toString();
   const hasBought = offer.buyingList.some((u) => u?.toString() === user?._id);

   res.render('offer/details', { offer, isOwner, hasBought });
});

router.get('/create', isGuest, (req, res) => {
   res.render('offer/create');
});

router.post('/create', async (req, res) => {
   const {
      name,
      type,
      damages,
      image,
      description,
      production,
      exploitation,
      price,
   } = req.body;
   const payload = {
      name,
      type,
      damages,
      image,
      description,
      production,
      exploitation,
      price,
      owner: req.user,
   };
   try {
      await offerService.create(payload);
      res.redirect('/offers/catalog');
   } catch (error) {
      const errorMessages = extractErrorMessages(error);
      res.status(404).render('offer/create', { errorMessages });
   }
});

router.get('/edit/:offerId', isGuest, ownershipGuard, async (req, res) => {
   const { offerId } = req.params;
   const offer = await offerService.getSingleOffer(offerId).lean();
   res.render('offer/edit', { offer });
});

router.post('/edit/:offerId', async (req, res) => {
   const { offerId } = req.params;
   const {
      name,
      type,
      damages,
      image,
      description,
      production,
      exploitation,
      price,
   } = req.body;
   const payload = {
      name,
      type,
      damages,
      image,
      description,
      production,
      exploitation,
      price,
      owner: req.user,
   };
   try {
      await offerService.update(offerId, payload);
      res.redirect(`/offers/details/${offerId}`);
   } catch (error) {
      const errorMessages = extractErrorMessages(error);
      //If there's an error make sure to return the values of all fields as they were, otherwise they would be empty and that's not good UX
      const { offerId } = req.params;
      const offer = await offerService.getSingleOffer(offerId).lean();
      res.status(404).render('offer/edit', { errorMessages, offer });
   }
});

router.get('/delete/:offerId', ownershipGuard, async (req, res) => {
   const { offerId } = req.params;
   await offerService.delete(offerId);
   res.redirect('/offers/catalog');
});

router.get('/buy/:offerId', isGuest, preventOwnersBuy, async (req, res) => {
   const { offerId } = req.params;
   const { user } = req;

   await offerService.addOwnerToBuyingList(offerId, user._id);
   res.redirect(`/offers/details/${offerId}`);
});

router.get('/search', isGuest, async (req, res) => {
   const offers = await offerService.getAll().lean();
   res.render('offer/search', { offers });
});

router.post('/search', async (req, res) => {
   const { name, type } = req.body;
   const offers = await offerService.searchOffers(name, type);
   res.render('offer/search', { offers });
});

module.exports = router;

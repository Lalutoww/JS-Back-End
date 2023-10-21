const jwt = require('../lib/jwt.js');
const { SECRET } = require('../constants.js');
const { getSingleOffer } = require('../services/offerService.js');

exports.auth = async (req, res, next) => {
   const token = req.cookies['auth'];

   if (token) {
      try {
         const verifiedToken = await jwt.verify(token, SECRET);
         req.user = verifiedToken;
         res.locals.user = verifiedToken;
         res.locals.isAuthenticated = true;

         next();
      } catch (err) {
         console.log({ err });
         res.clearCookie('auth');
         res.redirect('/users/login');
      }
   } else next();
};

//FOR THE FOLLOWING FUNCTIONS -> UNSURE IF IT'S BETTER TO REDIRECT TO 404 OR HOME PAGE - WORKS BOTH WAYS

//If user is not logged it -> redirect to login page
exports.isGuest = (req, res, next) => {
   if (!req.user) {
      return res.redirect('/users/login');
   }

   next();
};
//If user is logged in -> continue (prevents logged in users to access register page, etc.)
exports.isUser = (req, res, next) => {
   if (req.user) {
      return res.redirect('/404')
   } 
   next();
};

// Makes sure users who doesn't own that product won't be able to access page by url
exports.ownershipGuard = async (req, res, next) => {
   const { offerId } = req.params;
   const offer = await getSingleOffer(offerId);
   if (req.user._id !== offer.owner.toString()) {
      return res.redirect('/404');
   }

   next();
};

//Prevents owners to buy their own products by using url
exports.preventOwnersBuy = async (req, res, next) => {
   const { offerId } = req.params;
   const offer = await getSingleOffer(offerId);
   if (req.user._id === offer.owner.toString()) {
      return res.redirect('/404');
   }

   next();
};
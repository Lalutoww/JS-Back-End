const jwt = require('../lib/jwt.js');
const { SECRET } = require('../constants.js');

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

exports.isAuth = (req, res, next) => {
   if (!req.user) {
     return res.redirect("/users/login");
   }
 
   next();
 };
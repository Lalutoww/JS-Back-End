const router = require('express').Router();
const userService = require('../services/userService.js');
const { extractErrorMessages } = require('../utils/errorHandler.js');
const { isGuest, isUser } = require('../middlewares/authMiddleware.js');

router.get('/register', isUser, (req, res) => {
   res.render('user/register');
});

router.post('/register', async (req, res) => {
   const { email, username, password, rePassword } = req.body;
   try {
      if (password === rePassword)
         await userService.register({ email, username, password });
      else throw new Error('Password mismatch');

      res.redirect('/');
   } catch (error) {
      const errorMessages = extractErrorMessages(error);
      res.status(404).render('user/register', { errorMessages });
   }
});

router.get('/login', isUser, (req, res) => {
   res.render('user/login');
});

router.post('/login', async (req, res) => {
   const { email, password } = req.body;
   try {
      const token = await userService.login(email, password);

      res.cookie('auth', token, { httpOnly: true });

      res.redirect('/');
   } catch (error) {
      const errorMessages = extractErrorMessages(error);
      res.status(404).render('user/login', { errorMessages });
   }
});

router.get('/logout', isGuest, (req, res) => {
   res.clearCookie('auth');
   res.redirect('/');
});
module.exports = router;

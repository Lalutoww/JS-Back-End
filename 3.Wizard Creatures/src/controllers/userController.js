const router = require('express').Router();
const userService = require('../services/userService.js');
const { extractErrorMessages } = require('../utils/errorHandler.js');
const { isAuth } = require('../middlewares/authMiddleware.js');

router.get('/register', (req, res) => {
   res.render('user/register');
});

router.post('/register', async (req, res) => {
   const { firstName, lastName, email, password, repeatPassword } = req.body;
   try {
      if (password === repeatPassword)
         await userService.register({ firstName, lastName, email, password });
      else throw new Error('Password mismatch');

      res.redirect('/');
   } catch (error) {
      const errorMessages = extractErrorMessages(error);
      res.status(404).render('user/register', { errorMessages });
   }
});

router.get('/login', (req, res) => {
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

router.get('/logout',isAuth, (req, res) => {
   res.clearCookie('auth');
   res.redirect('/');
});
module.exports = router;

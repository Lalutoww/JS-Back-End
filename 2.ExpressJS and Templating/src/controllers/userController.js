const router = require('express').Router();
const userService = require('../services/userService.js');

router.get('/register', (req, res) => {
   res.render('user/register');
});

router.post('/register', (req, res) => {
   const { username, password, repeatPassword } = req.body;
   if (password === repeatPassword)
      userService.register({ username, password, repeatPassword });
   else throw new Error('Password mismatch');

   res.redirect('/users/login');
});

router.post('/login', async (req, res) => {
   const { username, password } = req.body;
   const token = await userService.login(username, password);

   res.cookie('auth', token, {httpOnly: true});

   res.redirect('/');
});

router.get('/login', (req, res) => {
   res.render('user/login');
});

router.get('/logout', (req,res)=>{
   res.clearCookie('auth');
   res.redirect('/');
})

module.exports = router;

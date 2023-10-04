const router = require('express').Router();
const accessoryService = require('../services/accessoryService.js');

//Render create page
router.get('/create', (req, res) => {
   res.render('accessory/create');
});

//Post request for the /create page
router.post('/create', (req, res) => {
   const { name, description, imageUrl } = req.body;
   accessoryService.create({
      name,
      description,
      imageUrl,
   });
   res.redirect('/');
});

module.exports = router;
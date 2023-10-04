const router = require('express').Router();
const homeController = require('./controllers/homeController.js'); //router is exported
const cubeController = require('./controllers/cubeController.js'); //router is exported
const accessoryController = require('./controllers/accessoryController.js'); //router is exported

router.use(homeController); //if no first parameter, then default path is set to '/'
router.use('/cubes', cubeController); //for all pages that start with /cubes 
router.use('/accessories', accessoryController);

router.get('*', (req,res)=>{
    res.redirect('404');
});

//Export to use it in index.js
module.exports = router;


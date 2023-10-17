const router = require('express').Router();
//router is exported
const homeController = require('./controllers/homeController.js');
const cubeController = require('./controllers/cubeController.js');
const accessoryController = require('./controllers/accessoryController.js');
const userController = require('./controllers/userController.js')

router.use(homeController); //if no first parameter, then default path is set to '/'
router.use('/cubes', cubeController); //for all pages that start with /cubes 
router.use('/accessories', accessoryController);
router.use('/users', userController);

router.get('*', (req,res)=>{
    res.redirect('404');
});

//Export to use it in index.js
module.exports = router;


//Imports
const router = require('express').Router();
const cubeService = require('../services/cubeService.js')

//Create Page [GET,POST]
router.get('/create', (req,res)=>{
    res.render('create');
});

router.post('/create', (req,res)=>{
    const {name, description, imageUrl, difficultyLevel} = req.body; //that's where bodyparser is needed

    cubeService.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel)
    });
    res.redirect('/');
});

//Details Page
router.get('/details/:cubeId', (req,res)=>{
    const {cubeId} = req.params;
    const cube = cubeService.getSingleCube(cubeId);

    if(!cube){
        res.redirect('/404');
        return;
    }
    res.render('details', {...cube})
})

//Export router because it gives an error if not exported and must be used in router.js
module.exports = router;
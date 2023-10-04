//Imports
const Cube = require('../models/cube.js')

const cubes = [];

//Named exports

exports.create = async (cubeData) =>{
   const cube = await Cube.create(cubeData);
   return cube;
}

//Get All - with implemented search function
exports.getAll = async(search, from, to) => {
   let filteredCubes = await Cube.find().lean();
   //lean() transforms mongoose Document class into JS object

   if (search) {
      filteredCubes = filteredCubes.filter((x) =>
         x.name.toLowerCase().includes(search.toLowerCase())
      );
   }
   if (from) {
      filteredCubes = filteredCubes.filter(
         (x) => x.difficultyLevel >= Number(from)
      );
   }
   if (to) {
      filteredCubes = filteredCubes.filter(
         (x) => x.difficultyLevel <= Number(to)
      );
   }
   return filteredCubes;
};

//Get single cube by id
exports.getSingleCube = async (id) => await Cube.findById(id).lean();

//Imports
const uniqid = require('uniqid');

const cubes = [];

//Named exports

//Create
exports.create = (cubeDataObj) => {
   const newCube = {
      id: uniqid(),
      ...cubeDataObj,
   };
   cubes.push(newCube);
   return newCube; //Good practice to return anything you create
};
//Get All - with implemented search function
exports.getAll = (search, from, to) => {
   let filteredCubes = [...cubes];

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
exports.getSingleCube = (id) => {
   const cube = cubes.find((x) => x.id === id);
   return cube;
};

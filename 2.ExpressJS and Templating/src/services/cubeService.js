//Imports
const Cube = require('../models/Cube.js')

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
exports.getSingleCube = async (id) => await Cube.findById(id).lean().populate('accessories');
//populate() replaces _id with the new 'parent' path id

//Attach accessory to cube
exports.attachAccessory = async(cubeId, accessoryId) =>{
   const cube = await Cube.findById(cubeId); // Lean doesn't work for some reason so this is just a temporary workaround
   cube.accessories.push(accessoryId); // we have the id from the req body and just push it into the array
   return cube.save();
}

exports.update = (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId,cubeData);

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);
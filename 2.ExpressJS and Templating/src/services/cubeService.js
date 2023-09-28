const uniqid = require('uniqid');
const cubes = [
   {
      id: 'un0jndnqlmtg3mgn',
      name: 'Kotkata Pesho',
      description: 'asd',
      imageUrl:
         'https://images.pexels.com/photos/1500610/pexels-photo-1500610.jpeg?cs=srgb&dl=pexels-jadson-thomas-1500610.jpg&fm=jpg',
      difficultyLevel: 1,
   },
   {
      id: 'un0jndnqlmtg3rm3',
      name: 'sad',
      description: 'asd',
      imageUrl: 'asd',
      difficultyLevel: 1,
   },
   {
      id: 'un0jndnqlmtg4are',
      name: 'cube3',
      description: 'n/a',
      imageUrl:
         'https://images.pexels.com/photos/1500610/pexels-photo-1500610.jpeg?cs=srgb&dl=pexels-jadson-thomas-1500610.jpg&fm=jpg',
      difficultyLevel: 3,
   },
];

exports.create = (cubeDataObj) => {
   const newCube = {
      id: uniqid(),
      ...cubeDataObj,
   };
   cubes.push(newCube);
   return newCube; //Good practice to return anything you create
};
exports.getAll = (search,from,to) => {
   let filteredCubes = [...cubes];

   if (search) {
    filteredCubes = filteredCubes.filter((x) =>
         x.name.toLowerCase().includes(search.toLowerCase())
      );
   }
   if (from) {
    filteredCubes = filteredCubes.filter((x) => x.difficultyLevel >= Number(from));
   }
   if (to) {
    filteredCubes = filteredCubes.filter((x) => x.difficultyLevel <= Number(to));
   }
   return filteredCubes;
};

exports.getSingleCube = (id) => {
   const cube = cubes.find((x) => x.id === id);
   return cube;
};

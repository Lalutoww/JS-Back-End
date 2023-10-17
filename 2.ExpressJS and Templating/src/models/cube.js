const mongoose = require('mongoose');

//Cube Schema
const cubeSchema = mongoose.Schema({
   name: String,
   description: String,
   imageUrl: String,
   difficultyLevel: Number,
   accessories: [
      {
         type: mongoose.Types.ObjectId, // must be written in order mongo to work
         ref: 'Accessory', // refference to the model
      },
   ],
   owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
   },
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;

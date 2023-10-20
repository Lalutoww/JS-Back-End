const mongoose = require('mongoose');

const creatureSchema = mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [2, 'Name must be atleast 2 characters'],
   },
   species: {
      type: String,
      required: [true, 'Species is required'],
      minLength: [3, 'Species must be atleast 3 characters'],
   },
   skinColor: {
      type: String,
      required: [true, 'Skin color is required'],
      minLength: [3, 'Skin color must be atleast 3 characters'],
   },
   eyeColor: {
      type: String,
      required: [true, 'Eye color is required'],
      minLength: [3, 'Eye color must be atleast 3 characters'],
   },
   image: {
      type: String,
      required: [true, 'Image is required'],
      match: [/^https?:\/\/.+/, 'Provide valid creature image link. '],
   },
   description: {
      type: String,
      required: [true, 'Description is required'],
      minLength: [5, 'Description must be atleast 5 characters'],
      maxLength: [500, 'Description must be no more than 500 characters'],
   },
   votes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
   owner: { type: mongoose.Types.ObjectId, ref: 'User' },
});

const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature;

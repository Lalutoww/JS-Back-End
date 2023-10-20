const mongoose = require('mongoose');

const creatureSchema = mongoose.Schema({
   name: { type: String, required: [true, 'Name is required'] },
   species: { type: String, required: [true, 'Species is required'] },
   skinColor: { type: String, required: [true, 'Skin color is required'] },
   eyeColor: { type: String, required: [true, 'Eye color is required'] },
   image: { type: String, required: [true, 'Image is required'] },
   description: { type: String, required: [true, 'Description is required'] },
   votes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
   owner: { type: mongoose.Types.ObjectId, ref: 'User' },
});

const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature;
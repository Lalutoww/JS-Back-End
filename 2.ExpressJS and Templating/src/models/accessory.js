const mongoose = require('mongoose');

//Accessory Schema
const accessorySchema = mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;
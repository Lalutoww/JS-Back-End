const Creature = require('../models/Creature.js');

exports.getAll = () => Creature.find();

exports.create = (creatureData) => Creature.create(creatureData);

exports.getSingleCreature = (creatureId) => Creature.findById(creatureId);

exports.update = (creatureId, creatureData) => Creature.findByIdAndUpdate(creatureId, creatureData)

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);
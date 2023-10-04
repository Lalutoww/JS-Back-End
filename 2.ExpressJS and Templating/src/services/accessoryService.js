//Imports
const Accessory = require('../models/accessory.js');

exports.create = (accessoryData)=>{
    const accessory = Accessory.create(accessoryData);
    return accessory;
}

exports.getAll = ()=> Accessory.find().lean();

exports.getWithoutOwned = (accessoryIds) => {
    // $nin => NOT IN
    return Accessory.find({ _id: { $nin: accessoryIds } });
};
//Imports
const Accessory = require('../models/Accessory.js');

//Create accessory
exports.create = (accessoryData)=>{
    const accessory = Accessory.create(accessoryData);
    return accessory;
}

//Get all accessories
exports.getAll = ()=> Accessory.find().lean();

exports.getWithoutOwned = (accessoryIds) => {
    // $nin => NOT IN
    //Find every id that is not in accessoryIds
    return Accessory.find({ _id: { $nin: accessoryIds } });
};
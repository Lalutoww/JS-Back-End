//Imports
const Accessory = require('../models/accessory.js');

exports.create = async (accessoryData)=>{
    const accessory = Accessory.create(accessoryData);
    return accessory;
}
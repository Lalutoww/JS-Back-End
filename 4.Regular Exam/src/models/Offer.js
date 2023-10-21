const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [10, 'Name must be at least 10 characters long'],
   },
   type: {
      type: String,
      required: [true, 'Type is required'],
      minLength: [2, 'Type must be at least 2 characters long'],
   },
   damages: {
      type: String,
      required: [true, 'Damages are required'],
      minLength: [10, 'Damages must be at least 10 characters long'],
   },
   image: {
      type: String,
      required: [true, 'Image is required'],
      match: [/^https?:\/\/.+/, 'Provide valid offer image link'],
   },
   description: {
      type: String,
      required: [true, 'Description is required'],
      minLength: [10, 'Description must be at least 10 characters long'],
      maxLength: [200, 'Description must be no more than 200 characters long'],
   },
   production: {
      type: Number,
      required: [true, 'Production year is required'],
      min: [1900, 'Production year must be higher than or equal to the year 1900'],
      max: [2023, 'Production year must not exceed the year 2023'],
   },
   exploitation: {
      type: Number,
      required: [true, 'Exploitation is required'],
      min: [0, 'Exploitation must be a positive number'],
   },
   price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
   },
   buyingList: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
   owner: { type: mongoose.Types.ObjectId, ref: 'User' },
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;

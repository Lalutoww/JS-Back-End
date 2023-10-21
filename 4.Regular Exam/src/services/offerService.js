const Offer = require('../models/Offer.js');

exports.getAll = () => Offer.find();

exports.create = (offerData) => Offer.create(offerData);

exports.getSingleOffer = (offerId) => Offer.findById(offerId);

exports.update = (offerId, offerData) =>
   Offer.findByIdAndUpdate(offerId, offerData, { runValidators: true });

exports.delete = (offerId) => Offer.findByIdAndDelete(offerId);

exports.searchOffers = async (name, type) => {
   let allOffers = await this.getAll().lean();
   if (name) {
      allOffers = allOffers.filter((offer) =>
         offer.name.toLowerCase().includes(name.toLowerCase())
      );
   }
   if (type) {
      allOffers = allOffers.filter((offer) =>
         offer.type.toLowerCase().includes(type.toLowerCase())
      );
   }
   return allOffers;
};

exports.addOwnerToBuyingList = async (offerId, userId) => {
   const offer = await this.getSingleOffer(offerId);
   const isExistingInBuyingList = offer.buyingList.some(
      (u) => u?.toString() === userId
   );

   if (isExistingInBuyingList) return;

   offer.buyingList.push(userId);
   return offer.save();
};

'use strict';
const mongoose = require('mongoose'),
    Donation = mongoose.model('donation');

/**
 * Returns a promise for search results.
 *
 * @param search param.
*/
exports.search = (params) => {
    const promise = Donation.find(params).exec();
    return promise;
};
/**
 * Saves a new doantion object.
 *
 * @param es
*/
exports.save =(es)=>{
    const newes= new Donation(es);
    return newes.save();

};

/**
 * Returns donation object by id.
 *
 * @param donationId
*/
exports.get = (donationId) => {
    const esPromise = Donation.findById(donationId).exec();
    return esPromise;
}; 


/**
 * Updates an existing donation.
 *
 * @param updateDonation
*/
exports.update = (updateDonation) => {
    const promise = Donation.findByIdAndUpdate(updateDonation.id, updateDonation).exec();
    return promise;
};


/**
 * Deletes an existing donation.
 *
 * @param donationId
*/
exports.delete = (donationId) => {
    const promise = Donation.findByIdAndRemove(donationId).exec();
    return promise;
};


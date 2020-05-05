'use strict'

const donationService = require('../services/donation-service');
/**
 * Sets response for order search using email address
 * 
 * @param request
 * @param response
 * 
 *
*/

exports.list= (request,response)=>{
    const emailQuery = request.query.email;
    const params = {};
    if(emailQuery) {
        params.email = emailQuery
    };
    
    const promise = donationService.search(params);
    const result =(todo)=>{
        response.status(200);
        response.json(todo);
    };
    promise.then(result);

};

/**
 * Creates a new donation and sets the response.
 *@param request
 *@param response
*/

exports.save= (request,response)=>{
    const donation = Object.assign({},request.body);
    const result = (saveEs)=>{
        response.status(201);
        response.json(saveEs);
    };
    const promise= donationService.save(donation);
    promise.then(result);

};


exports.get = (request, response) => {
    const donationId = request.params.id;
    const result = (donationes) => {
        response.status(200);
        response.json(donation);
    };
    const promise = donationService.get(donationId);
    promise
        .then(result);
};

/**
 * Updates already exisiting donation resource
 * @param request
 * @param response 
 */

exports.update = (request, response) => {
    const donationId = request.params.id;
    
    const updatedDonation = Object.assign({}, request.body);
    updatedDonation.id = donationId;
    const result = (donation) => {
        response.status(200);
        response.json(donation);
    };
    const promise = donationService.update(updatedDonation);
    promise
        .then(result);
};

/**
 * Deletes a donation resource.
 *
 * @param request
 * @param response
*/
exports.delete = (request, response) => {
    const donationId = request.params.id;
    const result = () => {
        response.status(200);
        response.json({
            message: "Successfully Deleted."
        });
    };
    const promise = donationService.delete(donationId);
    promise
    .then(result);
};
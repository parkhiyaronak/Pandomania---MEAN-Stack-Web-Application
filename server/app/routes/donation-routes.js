'use strict';

const donationController = require('../controller/donation-controller');

/**
 * Defining the routes for donation resource.
 */

module.exports = (app) => {
    app.route('/donations')
        .get(donationController.list)
        .post(donationController.save);

    app.route('/donations/:id')
        .put(donationController.update)
        .delete(donationController.delete);

};

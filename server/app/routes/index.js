'use strict';

const esRoute = require('./donation-routes');

const jwtRoute= require('./../routes/auth.routes');

module.exports = (app) => {
    esRoute(app);
};


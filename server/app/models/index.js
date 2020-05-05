'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const db = {};

db.mongoose = mongoose;

 db.user = require("./user.model");


const donationModel = require('./donation');

module.exports = db;
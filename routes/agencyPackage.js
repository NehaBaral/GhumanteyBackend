const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Packages = require('../models/main');
var authenticate = require('../authenticate');

const agencyPackageRouter = express.Router();
const { fileToUrl, addBaseUrlToPackageImage} = require('../utils');

agencyPackageRouter.use(bodyParser.json());
agencyPackageRouter.route('/')
    .get(authenticate.verifyUser, authenticate.verifyAgency, (req, res, next) => {
        Packages.find({agency: req.user._id})
        .populate('agency')
        .populate('bookings.author')
        .populate('comments.author')
            .then((packages) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(packages.map(it=>addBaseUrlToPackageImage(it)));
            },
            (err) => next(err))
            .catch((err) => next(err));
    })

module.exports = agencyPackageRouter;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Packages = require('../models/main');
const { fileToUrl, addBaseUrlToPackageImage} = require('../utils');

const searchRouter = express.Router();

searchRouter.use(bodyParser.json());
searchRouter.route('/')
    .post((req, res, next) => {
        Packages.find({destination: req.body.destination})
        .populate('agency')
            .then((packages) => {
                console.log(packages.searchRouter)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(packages.map(it=>addBaseUrlToPackageImage(it)));
            },
            (err) => next(err))
            .catch((err) => next(err));
    })

module.exports = searchRouter;
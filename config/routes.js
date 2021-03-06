'use strict';
const express = require('express');
const path = require('path');
const { HttpError } = require('../src/helpers/HttpError');
module.exports.setRoutes = (app) => {

    /**
     * Application Root Route.
     * Set the Welcome message or send a static html or use a view engine.
     */
    app.get('/', (req, res, next) => {
        res.send('Welcome to the APP');
    });

    /**
     * API Route.
     * All the API will start with "/api/[MODULE_ROUTE]"
     */
    app.use('/api', require('../src/routes'));

    /**
     * Serving Static files from uploads directory.
     * Currently Media module is uploading files into this directory.
     */
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    /**
     * If No route matches. Send user a 404 page
     */
    app.use('/*', (req, res, next) => {
        const error = new Error('Requested path does not exist.');
        error.statusCode = 404;
        res.status(error.statusCode).json(new HttpError(error));
    })
};

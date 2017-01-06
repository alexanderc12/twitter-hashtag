/**
 * Created by Alexander on 6/01/2017.
 */
var express = require('express');
var router = express.Router();
const https = require('https');

router.get('/',
    function (req, res, next) {
        const consumerKey = 'sFhabL37qJbV3Lu4DAPbUYaVO';
        const consumerSecret = 'WoDMiugKEJ3SNNhN5v3nmx7UYjGUozFDAHCEHXaxxUsN3s1l44';
        const encodeKey = new Buffer(consumerKey.concat(':').concat(consumerSecret)).toString('base64');
        const authUrl = 'api.twitter.com';
        const path = '/oauth2/token';

        var authReq = {
            method: 'POST',
            host: authUrl,
            path: path,
            headers: {
                'Authorization': 'Basic '.concat(encodeKey),
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        var connection = https.request(authReq, function (response) {
            var token = '';
            response.on('data', function (data) {
                token += data;
            });
            response.on('end', function () {
                req.token = token;
                next();
            });
            response.on('error', function (error) {
                console.error(error);
            });
        });
        connection.write("grant_type=client_credentials");
        connection.end();
    }, function (req, res, next) {
        res.send({token: req.token});
    }
);

module.exports = router;
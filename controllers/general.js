var express = require('express');
var router = express.Router();
var https = require('https');

router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/tweets', function (req, res, next) {
    const authUrl = 'api.twitter.com';
    const searchPath = '/1.1/search/tweets.json?q=%23' + req.body.text;
    var listReq = {
        method: 'GET',
        host: authUrl,
        path: searchPath,
        headers: {
            'Authorization': 'Bearer '.concat(req.body.token)
        }
    };
    var connection = https.request(listReq, function (response) {
        var list = '';
        response.on('data', function (data) {
            list += data;
        });
        response.on('end', function () {
            req.list = JSON.parse(list)['statuses'].map(function(tweet){return extractTweet(tweet)});
            next();
        });
        response.on('error', function (error) {
            console.error(error);
        });
    });
    connection.end();
}, function (req, res, next) {
    res.send({list: req.list});
});

var extractTweet = function (tweet) {
    var newTweet = {};
    newTweet.text = tweet.text;
    var date = new Date(tweet.created_at);
    newTweet.date = date.getDay()+ '/'+ date.getMonth()+1 + '/' + date.getFullYear();
    newTweet.user = tweet.user.name;
    newTweet.userImg = tweet.user.profile_image_url;
    newTweet.fav = false;
    return newTweet;
};

module.exports = router;

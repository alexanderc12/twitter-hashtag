/**
 * Created by Alexander on 6/01/2017.
 */
var app = angular.module('twitterApp', []);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('GeneralController', function($http, $sce){
    var ctrl = this;
    var token;
    var auth = function () {
        var tokenReq = {
            method: 'GET',
            url: 'http://127.0.0.1:8080/auth'
        };
        $http(tokenReq).then(function(res){
            token = JSON.parse(res.data.token)["access_token"];
            console.log(token);
        }, function(){console.log('Error');});
    };
    auth();

    ctrl.getList = function () {
        var listRew = {
            method: 'POST',
            url: 'http://127.0.0.1:8080/tweets',
            data: {token: token, text: ctrl.text}
        };
        $http(listRew).then(function(res){
            console.log(res.data);
        }, function(){console.log('Error');});
    };
});


/**
 * Created by Alexander on 6/01/2017.
 */
var app = angular.module('twitterApp', []);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('GeneralController', function($http) {
    var ctrl = this;
    ctrl.name = 'Alex';
    var auth = function () {
        var authReq = {
            method: 'GET',
            url: 'http://127.0.0.1:8080/auth'
        };
        $http(authReq).then(function(res){console.log(res.data);}, function(){console.log('Error');});
    };
    auth();
});


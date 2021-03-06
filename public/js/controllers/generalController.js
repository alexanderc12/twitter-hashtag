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
            ctrl.list = res.data.list;
        }, function(){console.log('Error');});
    };
});

app.component('tweet', {
    bindings: {
        data: '='
    },
    template:'<div class="card"> ' +
        '<div class="card-header">' +
            '<h2 style="float: left">[[$ctrl.data.user]]</h2>' +
            '<h4 style="float: right">[[$ctrl.data.date]]</h4>' +
        '</div>'+
        '<div class="card-body">'+
            '<p style="text-align: justify"><img  class="card-img" ng-src="[[$ctrl.data.userImg]]" alt="[[$ctrl.data.user]] image"/>[[$ctrl.data.text]]</p>' +
        '</div>' +
        '<div class="card-footer">' +
            ' <button data-ng-click="$ctrl.mark()"><span ng-show="[[$ctrl.data.fav]] === false"><i class="icon-star-empty"></i><span ng-show="[[$ctrl.data.fav]]"><i class="icon-star"></span></button>' +
        '<div>' +
    '</div>',
    controller: function () {
        function mark() {
            this.data.fav = !this.data.fav;
        }
        this.mark = mark;
    }
});


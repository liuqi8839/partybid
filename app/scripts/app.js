'use strict';

/**
 * @ngdoc overview
 * @name partybidApp
 * @description
 * # partybidApp
 *
 * Main module of the application.
 */
angular
  .module('partybidApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider

        .when('/price_list', {
            templateUrl: 'views/price_list.html',
            controller: 'PriceListCtrl'
        })
        .when('/price_activity', {
            templateUrl: 'views/price_activity.html',
            controller: 'PriceActivityCtrl'
        })
      .when('/create_activity', {
        templateUrl: 'views/create_activity.html',
        controller: 'CreateActivityCtrl'
      })

      .when('/activity_sign_up', {
            templateUrl: 'views/activity_sign_up.html',
            controller: 'ActivitySignUpCtrl'
        })
      .when('/', {
            templateUrl: 'views/activity_list.html',
            controller: 'ActivityListCtrl'
      })
        .when('/price_result/:show_hide', {
            templateUrl: 'views/price_result.html',
            controller: 'PriceResultCtrl'
        })

        .when('/price_statistics', {
            templateUrl: 'views/price_statistics.html',
            controller: 'PriceStatisticsCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });

  });

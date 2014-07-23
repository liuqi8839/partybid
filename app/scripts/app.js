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

      .when('/', {

        templateUrl: 'views/create_activity.html',
        controller: 'CreateActivityCtrl'
      })

      .when('/activity_sign_up', {
            templateUrl: 'views/activity_sign_up.html',
            controller: 'ActivitySignUpCtrl'
        })
      .when('/activity_list', {
            templateUrl: 'views/activity_list.html',
            controller: 'ActivityListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });

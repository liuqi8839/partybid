/**
 * Created by liuqi on 14-7-23.
 */
'use strict';


angular.module('partybidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {
        $scope.ActivityList = function () {
            $location.path('/activity_list')
        }
        $scope.ActivitySignUp = function () {
            $location.path('/activity_sign_up');
        }
    });
